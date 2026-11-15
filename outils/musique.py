"""Musique de fond libre de droits (générée, aucun échantillon externe).

Usage : python3 outils/musique.py sortie.wav duree_s [bpm]
Boucle lo-fi discrète : nappe d'accords, basse, kick doux, charleston.
"""
import sys
import numpy as np, soundfile as sf

out, duree = sys.argv[1], float(sys.argv[2])
bpm = float(sys.argv[3]) if len(sys.argv) > 3 else 96
SR = 48000
n = int(duree * SR)
t = np.arange(n) / SR
beat = 60 / bpm
rng = np.random.default_rng(9)
L = np.zeros(n)
R = np.zeros(n)


def hz(m):
    return 440 * 2 ** ((m - 69) / 12)


def ajoute(sig, debut, gauche=1.0, droite=1.0):
    i = int(debut * SR)
    if i >= n:
        return
    s = sig[: n - i]
    L[i : i + len(s)] += s * gauche
    R[i : i + len(s)] += s * droite


# La mineur — Fa — Do — Sol (une mesure de 4 temps par accord)
ACCORDS = [([57, 60, 64, 67], 45), ([53, 57, 60, 64], 41), ([48, 55, 60, 64], 36), ([55, 59, 62, 66], 43)]
mesure = 4 * beat
nb = int(duree / mesure) + 1
for b in range(nb):
    notes, basse = ACCORDS[b % 4]
    d = int(mesure * SR)
    x = np.arange(d) / SR
    env = np.minimum(1, x / 0.25) * np.minimum(1, (mesure - x) / 0.35)
    for k, m in enumerate(notes):
        f = hz(m)
        s = (np.sin(2 * np.pi * f * x) + 0.35 * np.sin(2 * np.pi * 2 * f * x + 0.5) + 0.5 * np.sin(2 * np.pi * f * 1.004 * x)) * env * 0.05
        pan = 0.35 + 0.3 * (k % 2)
        ajoute(s, b * mesure, 1 - pan + 0.35, pan + 0.35)
    for q in [0, 1.5, 2, 3.5]:  # basse
        d2 = int(beat * 0.9 * SR)
        x2 = np.arange(d2) / SR
        f = hz(basse)
        s = (np.sin(2 * np.pi * f * x2) + 0.3 * np.sin(2 * np.pi * 2 * f * x2)) * np.exp(-x2 * 4) * np.minimum(1, x2 / 0.01) * 0.22
        ajoute(s, b * mesure + q * beat)
    if b >= 2:  # la batterie entre après l'accroche
        for q in [0, 2, 2.5]:
            x3 = np.arange(int(0.3 * SR)) / SR
            s = np.sin(2 * np.pi * (48 * x3 + 55 * (1 - np.exp(-x3 * 28)) / 28)) * np.exp(-x3 * 13) * 0.42
            ajoute(s, b * mesure + q * beat)
        for q in [1, 3]:
            x4 = np.arange(int(0.16 * SR)) / SR
            bruit = rng.standard_normal(len(x4))
            s = (bruit * 0.6 + np.sin(2 * np.pi * 190 * x4)) * np.exp(-x4 * 30) * 0.1
            ajoute(s, b * mesure + q * beat)
        for q in np.arange(0, 4, 0.5):
            x5 = np.arange(int(0.05 * SR)) / SR
            bruit = np.diff(rng.standard_normal(len(x5) + 1))
            s = bruit * np.exp(-x5 * 90) * (0.035 if q % 1 else 0.02)
            ajoute(s, b * mesure + q * beat, 0.7, 1.0)

fondu = np.minimum(1, t / 0.4) * np.minimum(1, (duree - t) / 1.5)
st = np.stack([L, R], axis=1) * fondu[:, None]
st = np.tanh(st * 1.4) / np.max(np.abs(st)) * 0.7
sf.write(out, st.astype("float32"), SR, subtype="PCM_16")
print("musique :", out, duree, "s")
