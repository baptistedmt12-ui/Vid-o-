"""Sous-titres calés sur la voix off.

Usage : python3 scripts/captions.py <scripts.json> <id vidéo> <mots.json (Whisper)> <sortie .ts>
Le texte affiché est celui du script (orthographe exacte, nombres en chiffres) ; chaque mot du script
est aligné sur la transcription Whisper pour récupérer son instant, puis découpé en petits groupes.
"""
import difflib, json, re, sys, unicodedata

scripts, vid, words_p, out = sys.argv[1:5]
text = re.sub(r"\[[^\]]*\]\s*", "", " ".join(json.load(open(scripts))[vid]))  # sans les balises d'émotion ElevenLabs v3
for a, b in [("quatre cent soixante euros", "460\u00a0€"), ("mille cinq cents euros", "1\u00a0500\u00a0€"), ("dix-sept heures trente", "17\u00a0h\u00a030"), ("quatorze heures cinquante", "14\u00a0h\u00a050"), ("vingt-deux heures", "22\u00a0h"), ("dix-huit heures", "18\u00a0h"), ("quinze heures", "15\u00a0h"), ("dix minutes", "10\u00a0minutes"), ("vingt minutes", "20\u00a0minutes"), ("quarante-trois", "43"), ("trente-sept", "37"), ("quarante et un", "41"), ("seize", "16"), ("neuf heures", "9\u00a0h")]:
    text = text.replace(a, b)
import os
_rep = os.path.join(os.path.dirname(os.path.abspath(words_p)), "ersetzen.json")  # remplacements propres à la vidéo (chiffres…)
if os.path.exists(_rep):
    for a, b in json.load(open(_rep)).items():  # mots entiers seulement (sinon « gebracht » → « gebr8 »)
        text = re.sub(r"(?<![\wäöüÄÖÜß])" + re.escape(a) + r"(?![\wäöüÄÖÜß])", b, text)
words = [w for w in text.replace("\n", " ").split(" ") if w]  # les espaces insécables restent dans le mot

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in w if unicodedata.category(c) != "Mn"))

W = []
for s, e, w in json.load(open(words_p)):
    if W and (w.startswith("'") or w.startswith("-")):
        W[-1][1] = e; W[-1][2] += w
    else:
        W.append([s, e, w])
sm = difflib.SequenceMatcher(a=[norm(w) for w in words], b=[norm(x[2]) for x in W], autojunk=False)
T = [None] * len(words)
for blk in sm.get_matching_blocks():
    for i in range(blk.size):
        T[blk.a + i] = W[blk.b + i][0]
# mots non reconnus : interpolation entre voisins
known = [i for i, t in enumerate(T) if t is not None]
for i in range(len(T)):
    if T[i] is None:
        lo = max([k for k in known if k < i], default=None)
        hi = min([k for k in known if k > i], default=None)
        if lo is None: T[i] = T[hi]
        elif hi is None: T[i] = T[lo] + 0.3 * (i - lo)
        else: T[i] = T[lo] + (T[hi] - T[lo]) * (i - lo) / (hi - lo)

MAXW, MAXC = 4, 24
chunks, cur = [], []
for w, t in zip(words, T):
    cur.append({"t": round(t, 2), "w": w})
    if len(cur) >= MAXW or sum(len(x["w"]) + 1 for x in cur) >= MAXC or re.search(r"[.,:;?!][“”»\"]?$", w):
        chunks.append(cur); cur = []
if cur:
    chunks.append(cur)
# un mot seul (ex. « mehr. ») rejoint le groupe précédent s'il tient sur la ligne et que ce groupe ne finit pas une phrase
merged = []
for c in chunks:
    if merged and len(c) == 1 and not re.search(r"[.,:;?!][“”»\"]?$", merged[-1][-1]["w"]) \
            and sum(len(x["w"]) + 1 for x in merged[-1] + c) <= MAXC + 8:
        merged[-1] += c
    else:
        merged.append(c)
chunks = merged
end_voice = W[-1][1]
res = []
for i, c in enumerate(chunks):
    end = chunks[i + 1][0]["t"] if i + 1 < len(chunks) else end_voice + 0.4
    res.append({"t": c[0]["t"], "end": round(end, 2), "words": c})
open(out, "w").write("// Généré par scripts/captions.py — ne pas modifier à la main.\nexport const CAPTIONS: { t: number; end: number; words: { t: number; w: string }[] }[] = "
                     + json.dumps(res, ensure_ascii=False) + ";\n")
print(out, len(res), "groupes ;", len(known), "/", len(words), "mots alignés")
