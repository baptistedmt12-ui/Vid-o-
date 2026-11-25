"""Raccourcit les blancs SANS couper les mots : on ne retire que du silence réel (énergie mesurée),
avec une marge après la fin de chaque mot et avant le début du suivant.
Usage : python3 voix.py <mp3> <alignement.json> <sortie.wav> <sortie-mots.json> <blanc_cible_s>"""
import json, sys, numpy as np, soundfile as sf, librosa
SR = 48000
mp3, al_f, out_w, out_m, G = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], float(sys.argv[5])
y, _ = librosa.load(mp3, sr=SR, mono=True)
al = json.load(open(al_f)); ch = al['characters']; st = al['character_start_times_seconds']; en = al['character_end_times_seconds']
w = []; cur = ''; t0 = None
for c, a, b in zip(ch, st, en):
    if c.strip() and c not in ',!?.:…':
        if not cur: t0 = a
        cur += c; t1 = b
    elif cur: w.append([t0, t1, cur]); cur = ''
if cur: w.append([t0, t1, cur])
HOP = int(0.005 * SR)
rms = librosa.feature.rms(y=y, frame_length=2 * HOP, hop_length=HOP)[0]
seuil = max(np.percentile(rms, 20) * 2.0, rms.max() * 0.02)
silent = rms < seuil
MARGE_FIN, MARGE_DEBUT = 0.07, 0.04
cuts = []
for i in range(len(w) - 1):
    a, b = w[i][1], w[i + 1][0]
    fa, fb = int(max(0, a - 0.15) / 0.005), int((b + 0.15) / 0.005)
    # plus long passage vraiment silencieux autour de la pause annoncée
    best = (0, 0); k = fa
    while k < min(fb, len(silent)):
        if silent[k]:
            j = k
            while j < len(silent) and silent[j]: j += 1
            if j - k > best[1] - best[0]: best = (k, j)
            k = j
        else: k += 1
    s0, s1 = best[0] * 0.005 + MARGE_FIN, best[1] * 0.005 - MARGE_DEBUT
    garde = G - MARGE_FIN - MARGE_DEBUT
    if s1 - s0 > garde + 0.03:
        m = (s0 + s1) / 2; h = (s1 - s0 - garde) / 2; cuts.append((m - h, m + h))
# coupes triées et sans chevauchement
cuts.sort(); fus = []
for a, b in cuts:
    if fus and a <= fus[-1][1]: fus[-1] = (fus[-1][0], max(fus[-1][1], b))
    else: fus.append((a, b))
cuts = fus
out = []; last = 0; fade = int(0.008 * SR)
for a, b in cuts: out.append(y[int(last * SR):int(a * SR)]); last = b
out.append(y[int(last * SR):]); z = out[0]
for s in out[1:]:
    if len(s) <= 2 * fade or len(z) <= 2 * fade: z = np.concatenate([z, s]); continue
    r = np.linspace(0, 1, fade); z = np.concatenate([z[:-fade], z[-fade:] * (1 - r) + s[:fade] * r, s[fade:]])
nt = lambda t: t - sum(b - a for a, b in cuts if a < t)
fin = nt(w[-1][1]) + 0.15
z = z[:int(fin * SR)]
sf.write(out_w, z, SR, subtype='PCM_24')
json.dump([(round(nt(a), 3), x) for a, b, x in w], open(out_m, 'w'), ensure_ascii=False)
print(f'{mp3}: {len(y)/SR:.2f} s -> {len(z)/SR:.2f} s ({len(cuts)} blancs raccourcis)')
