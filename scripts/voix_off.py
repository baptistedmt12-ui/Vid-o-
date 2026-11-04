"""Voix off de synthèse fluide (Kokoro), voix d'homme.

Usage : python scripts/voix_off.py <dossier modèles kokoro> <scripts.json> <dossier sortie> '{"007":1.0}'
scripts.json = {"007": ["paragraphe HOOK", "paragraphe MISE EN PLACE", ...]}.
Tout le texte d'une vidéo est généré d'un bloc (Kokoro le découpe en morceaux de ~500 phonèmes aux ponctuations) : l'intonation s'enchaîne
d'une phrase à l'autre, avec de courtes pauses naturelles (pas de phrases collées une à une).
Voix « homme A » = 60 % im_nicola + 40 % ff_siwis (timbre grave, prononciation française).
"""
import json, re, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

M, src, out = sys.argv[1], sys.argv[2], sys.argv[3]
SP = json.loads(sys.argv[4])
k = Kokoro(M + "/kokoro-v1.0.onnx", M + "/voices-v1.0.bin")
VOICE = k.get_voice_style("im_nicola") * 0.6 + k.get_voice_style("ff_siwis") * 0.4
FIX = [("(en)", ""), ("(fr)", ""), ("pˈɑːkɪŋ", "paʁkˈiŋ"), ("vazistˈa", "vazistˈas")]

def phon(t):
    ph = k.tokenizer.phonemize(t, "fr-fr")
    for a, b in FIX:
        ph = ph.replace(a, b)
    return " ".join(ph.split())

for vid, paras in json.load(open(src)).items():
    if vid not in SP:
        continue
    # phrases regroupées par blocs de ~300 phonèmes max : chaque bloc est dit d'une traite
    sents = [x.strip() for p in paras for x in re.split(r"(?<=[.?!])\s+", p) if x.strip()]
    groups, cur = [], ""
    for x in sents:
        if cur and len(phon(cur + " " + x)) > 300:
            groups.append(cur); cur = x
        else:
            cur = (cur + " " + x).strip()
    groups.append(cur)
    parts = []
    for g in groups:
        a, sr = k.create(phon(g), voice=VOICE, speed=SP[vid], lang="fr-fr", is_phonemes=True, sentence_pause=0.14, clause_pause=0.04)
        idx = np.where(np.abs(a) > 0.01)[0]
        parts += [a[max(0, idx[0] - 240): idx[-1] + 1200], np.zeros(int(0.12 * sr), np.float32)]
    s = np.concatenate(parts)
    sf.write(f"{out}/{vid}_raw.wav", s, sr)
    print(vid, round(len(s) / sr, 2), "s,", len(groups), "blocs")
