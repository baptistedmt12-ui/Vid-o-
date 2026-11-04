"""Remodelage d'un rush : segments enchaînés, effets miroir, durée exacte, 1080×1920.

Usage : python3 scripts/remodel.py <rush> <sortie.mp4> <ambiance.wav> <durée> <segments.json>
segments.json : [[début, fin, mode], ...] avec mode = "n" (normal), "f" (miroir retourné), "s" (miroir symétrique).
Le dernier segment est raccourci pour tomber pile sur la durée demandée.
"""
import json, subprocess, sys

src, out, amb, total, segs = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]), json.load(open(sys.argv[5]))
dur = sum(b - a for a, b, _ in segs)
excess = dur - total
segs[-1][1] -= excess
assert segs[-1][1] > segs[-1][0]

f, cuts, t = [], [], 0.0
for i, (a, b, m) in enumerate(segs):
    v = f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS"
    if m == "f":
        v += ",hflip"
    if m == "s":
        v += f",crop=iw/2:ih:0:0,split[l{i}][r{i}];[r{i}]hflip[rf{i}];[l{i}][rf{i}]hstack"
    f.append(v + f",scale=1080:1920:flags=lanczos,setsar=1,fps=30[v{i}]")
    f.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS[a{i}]")
    if i:
        cuts.append(round(t, 2))
    t += b - a
n = len(segs)
f.append("".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
fc = ";".join(f)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-filter_complex", fc,
                "-map", "[v]", "-c:v", "libx264", "-crf", "12", "-preset", "slow", "-pix_fmt", "yuv420p", "-t", str(total), out,
                "-map", "[a]", "-ac", "2", "-ar", "48000", "-t", str(total), "-c:a", "pcm_s16le", amb], check=True)
print("coupes :", cuts)
