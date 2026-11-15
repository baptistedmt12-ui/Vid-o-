"""Voix off synthétique + minutage mot par mot.

Usage : python3 outils/voix.py NNN-nom [vitesse] [dossier_modeles]
  lit   videos/NNN-nom/voix-off.txt   (une phrase par ligne)
  écrit videos/NNN-nom/assets/voix.wav et src/videos/NNN-nom/voix.ts

Modèles (hors Git) : kokoro.onnx et voices.bin
  https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
Dépendances : pip install kokoro-onnx soundfile faster-whisper
"""
import difflib, json, re, sys, unicodedata
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
from faster_whisper import WhisperModel

nom = sys.argv[1]
vitesse = float(sys.argv[2]) if len(sys.argv) > 2 else 0.92
modeles = sys.argv[3] if len(sys.argv) > 3 else "."
PAUSE, DEBUT, FIN = 0.45, 0.35, 1.8  # secondes

lignes = [l.strip() for l in open(f"videos/{nom}/voix-off.txt", encoding="utf-8") if l.strip()]
tts = Kokoro(f"{modeles}/kokoro.onnx", f"{modeles}/voices.bin")
stt = WhisperModel("small", compute_type="int8")


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in s if unicodedata.category(c) != "Mn"))


piste, t, sortie, SR = [], DEBUT, [], 24000
piste.append(np.zeros(int(DEBUT * SR), dtype="float32"))
for ligne in lignes:
    a, sr = tts.create(ligne, voice="ff_siwis", speed=vitesse, lang="fr-fr")
    assert sr == SR
    a = a.astype("float32")
    actif = np.where(np.abs(a) > 0.01)[0]
    a = a[max(0, actif[0] - 480) : actif[-1] + 1200]
    # minutage Whisper, puis alignement sur les mots du script
    n = int(len(a) * 16000 / SR)
    a16 = np.interp(np.linspace(0, len(a) - 1, n), np.arange(len(a)), a).astype("float32")
    segs, _ = stt.transcribe(a16, language="fr", word_timestamps=True)
    entendus = []
    for s in segs:
        for w in s.words:
            x = w.word.strip()
            if x.startswith("'") and entendus:  # « c 'est » → « c'est »
                entendus[-1] = (entendus[-1][0] + x, entendus[-1][1], w.end)
            else:
                entendus.append((x, w.start, w.end))
    mots = [m for m in ligne.split() if norm(m)]
    dur = len(a) / SR
    temps = [None] * len(mots)
    sm = difflib.SequenceMatcher(a=[norm(m) for m in mots], b=[norm(e[0]) for e in entendus], autojunk=False)
    for i, j, k in sm.get_matching_blocks():
        for d in range(k):
            temps[i + d] = (entendus[j + d][1], entendus[j + d][2])
    # mots non reconnus : répartis entre leurs voisins
    i = 0
    while i < len(mots):
        if temps[i] is None:
            j = i
            while j < len(mots) and temps[j] is None:
                j += 1
            g = temps[i - 1][1] if i > 0 else 0.0
            d = temps[j][0] if j < len(mots) else dur
            pas = (d - g) / (j - i)
            for k in range(i, j):
                temps[k] = (g + pas * (k - i), g + pas * (k - i + 1))
            i = j
        else:
            i += 1
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
audio = audio / np.max(np.abs(audio)) * 0.89
sf.write(f"videos/{nom}/assets/voix.wav", audio, SR, subtype="PCM_16")
total = round(len(audio) / SR, 3)
with open(f"src/videos/{nom}/voix.ts", "w", encoding="utf-8") as f:
    f.write("// Généré par outils/voix.py — ne pas modifier à la main.\n")
    f.write(f"export const DUREE = {total};\n")
    f.write("export const LIGNES = " + json.dumps(sortie, ensure_ascii=False, indent=1) + ";\n")
print("durée totale :", total, "s")
for l in sortie:
    print(l["debut"], l["fin"], l["texte"][:50])
