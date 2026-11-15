"""Voix off synthétique + minutage mot par mot.

Usage : python3 outils/voix.py NNN-nom [pause_s] [dossier_cache]
  lit   videos/NNN-nom/voix-off.txt   (une phrase par ligne, nombres en lettres)
  écrit videos/NNN-nom/assets/voix.wav et src/videos/NNN-nom/voix.ts

Voix : Chatterbox multilingue (français) qui imite outils/voix-reference.wav
  (voix d'homme choisie par l'utilisateur, « voix 3 » ; don de voix CC0 du projet
  Unmute Voice Donation, fichier voice-donations/SSA150803_enhanced.wav de kyutai/tts-voices).
Chaque phrase est relue par Whisper : en cas de mot mal prononcé, on réessaie (3 essais).
Dépendances : pip install chatterbox-tts soundfile faster-whisper
              (torch CPU : --extra-index-url https://download.pytorch.org/whl/cpu)
"""
import difflib, json, os, re, sys, unicodedata
import numpy as np, soundfile as sf, torch
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
from faster_whisper import WhisperModel

nom = sys.argv[1]
PAUSE = float(sys.argv[2]) if len(sys.argv) > 2 else 0.5
cache = sys.argv[3] if len(sys.argv) > 3 else None
DEBUT, FIN = 0.35, 1.8  # secondes
REF = os.path.join(os.path.dirname(os.path.abspath(__file__)), "voix-reference.wav")
NOMBRES = {"un": "1", "deux": "2", "trois": "3", "six": "6", "sept": "7", "neuf": "9", "vingtquatre": "24", "quarantehuit": "48"}

lignes = [l.strip() for l in open(f"videos/{nom}/voix-off.txt", encoding="utf-8") if l.strip()]
stt = WhisperModel("small", compute_type="int8")
tts = None


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = re.sub(r"[^a-z0-9]", "", "".join(c for c in s if unicodedata.category(c) != "Mn"))
    return NOMBRES.get(s, s)


def ecoute(a, sr):
    n = int(len(a) * 16000 / sr)
    a16 = np.interp(np.linspace(0, len(a) - 1, n), np.arange(len(a)), a).astype("float32")
    segs, _ = stt.transcribe(a16, language="fr", word_timestamps=True)
    out = []
    for s in segs:
        for w in s.words:
            x = w.word.strip()
            if x.startswith("'") and out:  # « c 'est » → « c'est »
                out[-1] = (out[-1][0] + x, out[-1][1], w.end)
            else:
                out.append((x, w.start, w.end))
    return out


def synthese(i, ligne):
    """Renvoie (audio, sr, mots entendus) : meilleur de 3 essais, mis en cache."""
    global tts
    mots = [norm(m) for m in ligne.split() if norm(m)]
    p = f"{cache}/{i:02d}.wav" if cache else None
    if p and os.path.exists(p) and open(p + ".txt", encoding="utf-8").read() == ligne:
        a, sr = sf.read(p, dtype="float32")
        return a, sr, ecoute(a, sr)
    if tts is None:
        torch.set_num_threads(os.cpu_count() or 4)
        tts = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
    best = None
    for graine in (3, 11, 27):
        torch.manual_seed(graine)
        w = tts.generate(ligne, language_id="fr", audio_prompt_path=REF, exaggeration=0.5, cfg_weight=0.5)
        a = w.squeeze().numpy().astype("float32")
        actif = np.where(np.abs(a) > 0.012)[0]
        a = a[max(0, actif[0] - 500) : actif[-1] + 1500]
        e = ecoute(a, tts.sr)
        score = difflib.SequenceMatcher(a=mots, b=[norm(x[0]) for x in e], autojunk=False).ratio()
        print(f"  phrase {i} graine {graine} : {score:.2f} | {' '.join(x[0] for x in e)}", flush=True)
        if best is None or score > best[0]:
            best = (score, a, e)
        if score >= 0.93:
            break
    if p:
        os.makedirs(cache, exist_ok=True)
        sf.write(p, best[1], tts.sr, subtype="PCM_16")
        open(p + ".txt", "w", encoding="utf-8").write(ligne)
    return best[1], tts.sr, best[2]


piste, t, sortie, SR = [], DEBUT, [], None
for i, ligne in enumerate(lignes):
    a, sr, entendus = synthese(i, ligne)
    SR = SR or sr
    if not piste:
        piste.append(np.zeros(int(DEBUT * SR), dtype="float32"))
    a = a / max(1e-6, np.max(np.abs(a))) * 0.85  # même niveau pour chaque phrase
    mots = [m for m in ligne.split() if norm(m)]
    dur = len(a) / SR
    temps = [None] * len(mots)
    sm = difflib.SequenceMatcher(a=[norm(m) for m in mots], b=[norm(e[0]) for e in entendus], autojunk=False)
    for x, y, k in sm.get_matching_blocks():
        for d in range(k):
            temps[x + d] = (entendus[y + d][1], entendus[y + d][2])
    # mots non reconnus : répartis entre leurs voisins
    x = 0
    while x < len(mots):
        if temps[x] is None:
            y = x
            while y < len(mots) and temps[y] is None:
                y += 1
            g = temps[x - 1][1] if x > 0 else 0.0
            d = temps[y][0] if y < len(mots) else dur
            pas = (d - g) / (y - x)
            for k in range(x, y):
                temps[k] = (g + pas * (k - x), g + pas * (k - x + 1))
            x = y
        else:
            x += 1
    sortie.append(
        {
            "texte": ligne,
            "debut": round(t, 3),
            "fin": round(t + dur, 3),
            "mots": [{"m": m, "t0": round(t + a0, 3), "t1": round(t + a1, 3)} for m, (a0, a1) in zip(mots, temps)],
        }
    )
    piste += [a, np.zeros(int(PAUSE * SR), dtype="float32")]
    t += dur + PAUSE
piste.append(np.zeros(int(FIN * SR), dtype="float32"))
audio = np.concatenate(piste)
sf.write(f"videos/{nom}/assets/voix.wav", audio, SR, subtype="PCM_16")
total = round(len(audio) / SR, 3)
with open(f"src/videos/{nom}/voix.ts", "w", encoding="utf-8") as f:
    f.write("// Généré par outils/voix.py — ne pas modifier à la main.\n")
    f.write(f"export const DUREE = {total};\n")
    f.write("export const LIGNES = " + json.dumps(sortie, ensure_ascii=False, indent=1) + ";\n")
print("durée totale :", total, "s")
for l in sortie:
    print(l["debut"], l["fin"], l["texte"][:50])
