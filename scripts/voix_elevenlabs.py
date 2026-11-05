"""Voix off ElevenLabs (voix Charlie par défaut, très expressive), tout le script d'une vidéo en une seule requête (fluide).

Usage : ELEVENLABS_API_KEY=... python3 scripts/voix_elevenlabs.py <scripts.json> <id vidéo> <sortie.mp3> [vitesse] [voice_id]
La clé n'est jamais écrite dans le dépôt : elle vient de la variable d'environnement.
"""
import json, os, sys, urllib.request

src, vid, out = sys.argv[1:4]
speed = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
voice = sys.argv[5] if len(sys.argv) > 5 else "IKne3meq5aSn9XLyUdCD"  # Charlie (voix gratuite via l'API)
text = " ".join(json.load(open(src))[vid])
body = {
    "text": text,
    "model_id": "eleven_multilingual_v2",
    "language_code": "fr",
    "voice_settings": {"stability": 0.3, "similarity_boost": 0.8, "style": 0.65, "use_speaker_boost": True, "speed": speed},
}
req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128",
    data=json.dumps(body).encode(), headers={"xi-api-key": os.environ["ELEVENLABS_API_KEY"], "Content-Type": "application/json"})
with urllib.request.urlopen(req) as r:
    open(out, "wb").write(r.read())
print(out, len(text), "caractères")
