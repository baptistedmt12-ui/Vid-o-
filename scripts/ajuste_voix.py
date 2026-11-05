"""Ajuste une voix off à une durée cible sans changer la hauteur de la voix.

Usage : python3 scripts/ajuste_voix.py <entrée audio> <sortie.wav> <durée cible en s> [pause max en s]
1) raccourcit les silences trop longs (au-delà de « pause max », 0,2 s par défaut) ;
2) accélère légèrement ce qui reste (ffmpeg rubberband, hauteur conservée) pour tomber pile sur la durée.
"""
import subprocess, sys
import numpy as np

src, out, target = sys.argv[1], sys.argv[2], float(sys.argv[3])
pmax = float(sys.argv[4]) if len(sys.argv) > 4 else 0.2
SR = 48000
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
a = np.frombuffer(raw, np.float32).copy()
hop = SR // 100
rms = np.sqrt(np.convolve(a ** 2, np.ones(hop) / hop, "same"))
quiet = rms < 10 ** (-40 / 20)
# segments silencieux
keep = np.ones(len(a), bool)
i, n = 0, len(a)
while i < n:
    if quiet[i]:
        j = i
        while j < n and quiet[j]:
            j += 1
        if j - i > pmax * SR and i > 0 and j < n:
            half = int(pmax * SR / 2)
            keep[i + half: j - half] = False
        i = j
    else:
        i += 1
b = a[keep]
# ne garde que la fin naturelle de la dernière phrase (+ 0,15 s)
nz = np.where(np.abs(b) > 0.01)[0]
b = b[: nz[-1] + int(0.15 * SR)]
mid = len(b) / SR
tempo = max(1.0, mid / target)
tmp = out + ".tmp.f32"
b.astype(np.float32).tofile(tmp)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", tmp,
                "-af", f"rubberband=tempo={tempo:.4f}:pitchq=quality:transients=smooth", "-c:a", "pcm_s16le", out], check=True)
subprocess.run(["rm", "-f", tmp])
print(f"{src.split('/')[-1]} : {len(a)/SR:.1f} s → silences raccourcis {mid:.1f} s → tempo ×{tempo:.3f} → {target:.1f} s")
