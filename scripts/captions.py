"""Sous-titres calés sur la voix off.

Usage : python3 scripts/captions.py <dossier vidéo (videos/NNN-nom)> <sortie .ts>
Lit assets/phrases.json (début/fin exacts de chaque phrase générée) et assets/mots.json (Whisper),
découpe chaque phrase en petits groupes de mots et écrit un module TypeScript.
Le texte affiché est celui du script (orthographe exacte), les nombres sont écrits en chiffres.
"""
import json, re, sys

d, out = sys.argv[1], sys.argv[2]
lines = json.load(open(f"{d}/assets/phrases.json"))
whisper = json.load(open(f"{d}/assets/mots.json"))

# mots Whisper fusionnés (« m » + « 'a » → un mot), pour comparer au script
merged = []
for s, e, w in whisper:
    if merged and (w.startswith("'") or w.startswith("-")):
        merged[-1][1] = e
    else:
        merged.append([s, e, w])

NUM = [("quarante-trois", "43"), ("trente-sept", "37"), ("quarante et un", "41"), ("seize", "16"), ("neuf heures", "9 h")]
MAXW, MAXC = 4, 24
chunks = []
for ln in lines:
    text = ln["text"]
    for a, b in NUM:
        text = text.replace(a, b)
    words = text.split()
    t0, t1 = ln["t"], ln["end"]
    ws = [m for m in merged if t0 - 0.12 <= m[0] < t1 - 0.05]
    if len(ws) == len(words):
        starts = [max(t0, m[0]) for m in ws]
    else:  # répartition au prorata du nombre de lettres
        tot = sum(len(w) + 1 for w in words)
        acc, starts = 0, []
        for w in words:
            starts.append(t0 + (t1 - t0) * acc / tot)
            acc += len(w) + 1
    # groupes de mots : coupe après une ponctuation ou quand c'est trop long
    cur = []
    for w, s in zip(words, starts):
        cur.append({"t": round(s, 2), "w": w})
        size = sum(len(x["w"]) + 1 for x in cur)
        if len(cur) >= MAXW or size >= MAXC or re.search(r"[.,:;?!]$", w):
            chunks.append(cur); cur = []
    if cur:
        chunks.append(cur)
    chunks[-1][-1]["lineEnd"] = round(t1, 2)

res = []
for i, c in enumerate(chunks):
    nxt = chunks[i + 1][0]["t"] if i + 1 < len(chunks) else c[0]["t"] + 3
    end = min(nxt, c[-1].get("lineEnd", nxt) + 0.25)
    res.append({"t": c[0]["t"], "end": round(end, 2), "words": [{"t": x["t"], "w": x["w"]} for x in c]})
open(out, "w").write("// Généré par scripts/captions.py — ne pas modifier à la main.\nexport const CAPTIONS: { t: number; end: number; words: { t: number; w: string }[] }[] = "
                     + json.dumps(res, ensure_ascii=False) + ";\n")
ok = sum(1 for ln in lines if len([m for m in merged if ln["t"] - 0.12 <= m[0] < ln["end"] - 0.05]) == len(ln["text"].split()))
print(out, len(res), "groupes ;", ok, "/", len(lines), "phrases calées sur Whisper")
