# Voix off de synthèse (Kokoro, voix française ff_siwis), une phrase à la fois, sans blancs.
# Usage : python scripts/voix_off.py <dossier modèles kokoro> <dossier contenant scripts.json> '{"007":1.06}'
# scripts.json = {"007": ["phrase 1", "phrase 2", ...]} ; sortie <id>_raw.wav + <id>_lines.json
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
M, out = sys.argv[1], sys.argv[2]; SP = json.loads(sys.argv[3])
k = Kokoro(M+"/kokoro-v1.0.onnx", M+"/voices-v1.0.bin")
scripts = json.load(open(out+"/scripts.json"))
for vid, lines in scripts.items():
    parts, meta, t = [], [], 0.0
    for i, line in enumerate(lines):
        ph = k.tokenizer.phonemize(line, "fr-fr")
        for a, b in [("(en)", ""), ("(fr)", ""), ("pˈɑːkɪŋ", "paʁkˈiŋ"), ("vazistˈa", "vazistˈas")]:
            ph = ph.replace(a, b)
        if "(" in ph: print("LANG SWITCH", line, ph)
        s, sr = k.create(ph, voice="ff_siwis", speed=SP[vid], lang="fr-fr", is_phonemes=True)
        # coupe les silences de début/fin
        idx = np.where(np.abs(s) > 0.01)[0]
        s = s[max(0, idx[0]-240): idx[-1]+480]
        gap = 0.16 if line.endswith(("?", ".")) else 0.08
        meta.append({"i": i, "t": round(t, 3), "end": round(t+len(s)/sr, 3), "text": line})
        parts += [s, np.zeros(int(gap*sr), np.float32)]
        t += len(s)/sr + gap
    a = np.concatenate(parts)
    sf.write(f"{out}/{vid}_raw.wav", a, sr)
    json.dump(meta, open(f"{out}/{vid}_lines.json", "w"), ensure_ascii=False, indent=1)
    print(vid, round(len(a)/sr, 2), "s", sum(len(l.split()) for l in lines), "mots")
