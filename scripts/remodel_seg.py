"""Remodelage d'un rush, plan par plan (peu de mémoire, pour les rushes lourds : 1080p 60 i/s, VP9…).

Même usage et même segments.json que remodel.py, mais chaque plan est extrait à part (recherche rapide -ss),
puis les plans sont mis bout à bout. Vitesse 1 uniquement (pas de ralenti ni d'accéléré, demande de l'utilisateur).
Usage : python3 scripts/remodel_seg.py <rush> <sortie.mp4> <ambiance.wav> <durée> <segments.json>
"""
import json, os, subprocess, sys, tempfile

src, out, amb, total, segs = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]), json.load(open(sys.argv[5]))
dur = sum(b - a for a, b, *_ in segs)
segs[-1][1] -= dur - total  # le dernier plan est ajusté pour tomber pile sur la durée
assert segs[-1][1] > segs[-1][0]
tmp = tempfile.mkdtemp(dir=os.path.dirname(out))
vids, auds, cuts, t = [], [], [], 0.0
for i, (a, b, m, *_) in enumerate(segs):
    vf = ("hflip," if m == "f" else "") + "scale=1080:1920:flags=lanczos,setsar=1,fps=30"
    v, w = f"{tmp}/v{i:02d}.mp4", f"{tmp}/a{i:02d}.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(a), "-i", src, "-t", str(b - a), "-vf", vf, "-an",
                    "-c:v", "libx264", "-crf", "12", "-preset", "slow", "-pix_fmt", "yuv420p", "-threads", "4", v], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(a), "-i", src, "-t", str(b - a), "-vn",
                    "-ac", "2", "-ar", "48000", "-c:a", "pcm_s16le", w], check=True)
    vids.append(v); auds.append(w)
    if i:
        cuts.append(round(t, 2))
    t += b - a
for lst, files in (("v.txt", vids), ("a.txt", auds)):
    open(f"{tmp}/{lst}", "w").write("".join(f"file '{f}'\n" for f in files))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", f"{tmp}/v.txt", "-c", "copy", "-t", str(total), out], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", f"{tmp}/a.txt", "-c:a", "pcm_s16le", "-t", str(total), amb], check=True)
for f in vids + auds + [f"{tmp}/v.txt", f"{tmp}/a.txt"]:
    os.remove(f)
os.rmdir(tmp)
print("coupes :", cuts)
