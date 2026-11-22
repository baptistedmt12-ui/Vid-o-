"""Musique de fond (house douce et chic, 100 BPM) + bruitages, générés (aucun droit d'auteur).
Usage : python3 sons.py <dossier assets>"""
import numpy as np, sys, wave
SR = 48000; OUT = sys.argv[1]
rng = np.random.default_rng(7)

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
BPM = 100; B = 60 / BPM; DUR = 66.0
N = int(DUR * SR); mus = np.zeros((N, 2))
def add(sig, start, pan=0.0, gain=1.0):
    i = int(start * SR)
    if i >= N: return
    sig = sig[: N - i]
    mus[i:i + len(sig), 0] += sig * gain * (1 - pan) ** 0.5
    mus[i:i + len(sig), 1] += sig * gain * (1 + pan) ** 0.5

# accords (4 temps chacun) : Fmaj9 - Em7 - Dm9 - Cmaj9 (feutré, « luxe »)
CH = [[53, 57, 60, 64, 67], [52, 55, 59, 62, 66], [50, 53, 57, 60, 64], [48, 52, 55, 59, 62]]
BASS = [41, 40, 38, 36]
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

# ---------- Bruitages ----------
# BOOM : sous-grave qui chute + impact bruité + queue
tt = t_(1.6); f = 32 + 120 * np.exp(-tt * 14)
boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 2.6)
boom += lpf(rng.standard_normal(len(tt)), 900) * np.exp(-tt * 18) * 1.4
save("boom.wav", np.tanh(boom * 1.6))
# POP (cercle / flèche) : petit « bloup » propre
tt = t_(0.16); f = 380 + 900 * np.exp(-tt * 45)
pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 28) * np.minimum(1, tt / 0.002)
save("pop.wav", pop)
# TINTEMENT (prix) : cloche brillante
tt = t_(1.3)
bell = sum(a * np.sin(2 * np.pi * fr * tt) * np.exp(-tt * dk) for fr, a, dk in [(1568, 1, 3.5), (2093, .6, 4.5), (3136, .35, 6), (4186, .2, 8)])
save("tintement.wav", bell * np.minimum(1, tt / 0.003))
print("ok")

# ARGENT (prix) : « ka-ching » = clic mécanique + pièces + cloche de caisse
tt = t_(1.4); x = np.zeros(len(tt))
clk = hpf(rng.standard_normal(int(0.03 * SR)), 2500) * np.exp(-t_(0.03) * 120); x[:len(clk)] += clk * 0.8
for k in range(7):  # pièces qui tintent
    i0 = int((0.06 + k * 0.035 + rng.uniform(0, 0.02)) * SR); d = t_(0.25)
    fr = rng.uniform(3500, 6500)
    c = (np.sin(2 * np.pi * fr * d) + 0.5 * np.sin(2 * np.pi * fr * 1.5 * d)) * np.exp(-d * 30)
    x[i0:i0 + len(c)] += c[: len(x) - i0] * 0.35
i0 = int(0.12 * SR); d = t_(1.2)
bell = sum(a * np.sin(2 * np.pi * fr * d) * np.exp(-d * dk) for fr, a, dk in [(2637, 1, 3.2), (3951, .5, 4), (5274, .3, 6)])
x[i0:i0 + len(d)] += bell[: len(x) - i0] * 0.6
save("argent.wav", x)
# PLOUF (piscine) : bulle qui monte + éclaboussure douce
tt = t_(0.7); f = 250 + 900 * (1 - np.exp(-tt * 18))
blub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9) * np.minimum(1, tt / 0.005)
spl = lpf(hpf(rng.standard_normal(len(tt)), 800), 6000) * np.exp(-tt * 7) * np.minimum(1, tt / 0.02) * 0.35
save("plouf.wav", blub * 0.8 + spl)
# VERRE (cave à vin) : tintement de deux verres
tt = t_(1.5); x = np.zeros(len(tt))
for i0, fr in [(0, 2850), (int(0.09 * SR), 3320)]:
    d = t_(1.4); g = sum(a * np.sin(2 * np.pi * fr * m * d) * np.exp(-d * dk) for m, a, dk in [(1, 1, 3), (2.76, .35, 6), (5.4, .15, 9)])
    x[i0:i0 + len(d)] += g[: len(x) - i0]
save("verre.wav", x * np.minimum(1, tt / 0.002))
# SCINTILLEMENT (architecture) : arpège de clochettes ascendant
tt = t_(1.3); x = np.zeros(len(tt))
for k, m in enumerate([84, 88, 91, 96]):
    i0 = int(k * 0.06 * SR); d = t_(1.0)
    b = np.sin(2 * np.pi * mtof(m) * d) * np.exp(-d * 4.5) + 0.3 * np.sin(2 * np.pi * mtof(m + 12) * d) * np.exp(-d * 7)
    x[i0:i0 + len(d)] += b[: len(x) - i0] * (0.6 + 0.1 * k)
save("scintille.wav", x)
print("sons supplémentaires ok")

# COUSSIN (canapé) : « pouf » moelleux
tt = t_(0.45)
pouf = lpf(rng.standard_normal(len(tt)), 500) * np.exp(-tt * 14) * np.minimum(1, tt / 0.015)
pouf += np.sin(2 * np.pi * 90 * tt) * np.exp(-tt * 18) * 0.6
save("coussin.wav", pouf)
# JEU (salle de jeux) : deux petites notes rétro (carré adouci)
x = np.zeros(int(0.42 * SR))
for i0, m in [(0, 76), (int(0.11 * SR), 83)]:
    d = t_(0.2); sq = np.tanh(4 * np.sin(2 * np.pi * mtof(m) * d)) * np.exp(-d * 14) * np.minimum(1, d / 0.003)
    x[i0:i0 + len(d)] += sq[: len(x) - i0]
save("jeu.wav", lpf(x, 5000))
print("coussin + jeu ok")
