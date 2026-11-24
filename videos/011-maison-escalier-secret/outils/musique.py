"""Musique de fond vidéo 011 (house douce, 104 BPM, Am9 - Fmaj7 - Cmaj7 - G6) + bruitages, générés (aucun droit d'auteur).
Usage : python3 sons.py <dossier assets>"""
import numpy as np, sys, wave
SR = 48000; OUT = sys.argv[1]
rng = np.random.default_rng(11)

def save(name, x):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1: x = np.stack([x, x], 1)
    x = x / (np.abs(x).max() + 1e-9) * 0.89
    with wave.open(f"{OUT}/{name}", "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())

def t_(d): return np.arange(int(d * SR)) / SR
def lp(x, a):  # filtre passe-bas 1 pôle
    y = np.empty_like(x); s = 0.0
    for i, v in enumerate(x): s += a * (v - s); y[i] = s
    return y
def lpf(x, fc):  # passe-bas rapide par FFT
    X = np.fft.rfft(x, axis=0); f = np.fft.rfftfreq(len(x), 1 / SR)
    g = 1 / np.sqrt(1 + (f / fc) ** 4)
    return np.fft.irfft(X * (g[:, None] if X.ndim > 1 else g), n=len(x), axis=0)
def hpf(x, fc):
    X = np.fft.rfft(x, axis=0); f = np.fft.rfftfreq(len(x), 1 / SR)
    g = 1 - 1 / np.sqrt(1 + (f / fc) ** 4)
    return np.fft.irfft(X * (g[:, None] if X.ndim > 1 else g), n=len(x), axis=0)
def mtof(m): return 440 * 2 ** ((m - 69) / 12)

# ---------- Musique ----------
BPM = 104; B = 60 / BPM; DUR = 66.0
N = int(DUR * SR); mus = np.zeros((N, 2))
def add(sig, start, pan=0.0, gain=1.0):
    i = int(start * SR)
    if i >= N: return
    sig = sig[: N - i]
    mus[i:i + len(sig), 0] += sig * gain * (1 - pan) ** 0.5
    mus[i:i + len(sig), 1] += sig * gain * (1 + pan) ** 0.5

# accords (4 temps chacun) : Fmaj9 - Em7 - Dm9 - Cmaj9 (feutré, « luxe »)
CH = [[57, 60, 64, 67, 71], [53, 57, 60, 64, 67], [48, 52, 55, 59, 62], [55, 59, 62, 64, 69]]
BASS = [45, 41, 36, 43]
bars = int(DUR / (4 * B)) + 1
for b in range(bars):
    t0 = b * 4 * B; ch = CH[b % 4]
    # nappe (pad) : sinus désaccordés, attaque lente
    tt = t_(4 * B + 0.6); env = np.minimum(1, tt / 0.8) * np.exp(-np.maximum(0, tt - 4 * B) * 6)
    pad = sum(np.sin(2 * np.pi * mtof(m) * tt * d + rng.uniform(0, 6)) for m in ch for d in (0.997, 1.003))
    add(pad * env * 0.05, t0, pan=-0.2); add(pad * env * 0.05, t0 + 0.012, pan=0.2)
    # piano électrique sur les contretemps
    for k in range(4):
        if b < 1 and k < 2: continue
        tt = t_(0.9); e = np.exp(-tt * 4.5)
        ep = sum(np.sin(2 * np.pi * mtof(m + 12) * tt + 0.8 * np.sin(2 * np.pi * mtof(m + 12) * tt) * e) for m in ch[1:4])
        add(ep * e * 0.045, t0 + k * B + B / 2, pan=0.35 if k % 2 else -0.35)
    # basse
    for k, off in enumerate([0, 1.5, 2.5]):
        tt = t_(B * 0.9); e = np.minimum(1, tt / 0.01) * np.exp(-tt * 3)
        add(np.sin(2 * np.pi * mtof(BASS[b % 4]) * tt) * e * 0.22, t0 + off * B)
    # batterie (entre après la 1re mesure)
    for k in range(4):
        tb = t0 + k * B
        if b >= 1 or k >= 2:
            tt = t_(0.35); f = 50 + 90 * np.exp(-tt * 30)
            add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9) * 0.32, tb)
        if b >= 1:
            h = hpf(rng.standard_normal(int(0.06 * SR)), 7000) * np.exp(-t_(0.06) * 60)
            add(h * 0.05, tb + B / 2, pan=0.3)
            if k in (1, 3):
                c = hpf(rng.standard_normal(int(0.18 * SR)), 1500) * np.exp(-t_(0.18) * 25)
                add(c * 0.06, tb, pan=-0.1)
# léger écho / espace
d = int(0.375 * SR); rev = np.zeros_like(mus); rev[d:] = mus[:-d] * 0.22
mus = lpf(mus + rev, 9000)
fade = np.ones(N); fl = int(2.0 * SR); fade[-fl:] = np.linspace(1, 0, fl)
save("musique.wav", mus * fade[:, None])

print("musique ok")
