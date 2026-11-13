# Montage 012 : plans réordonnés (source = original.mp4), m=1 → miroir (inversion gauche/droite).
# Généré en une seule passe ffmpeg (aucun filtre d'image, coupes franches), sans le son d'origine.
import subprocess, sys
SRC = sys.argv[1]; OUT = sys.argv[2]
SEGS = [  # (début, fin, miroir)
    (37.37, 39.00, 0),  # accroche : jet de vapeur en gros plan
    (66.67, 68.80, 0),  # arrivée : le jet sur le tarmac
    (68.80, 69.87, 0),
    (2.53, 3.77, 0),    # arrivée en voiture
    (3.77, 7.63, 1),    # inspection
    (7.63, 9.73, 0),    # matériel
    (9.77, 11.37, 0),
    (12.47, 18.50, 1),  # sièges : scotch + nettoyage
    (20.10, 24.10, 0),
    (26.13, 30.50, 1),  # vapeur sur le siège
    (31.20, 35.00, 0),  # allée en plan large
    (35.00, 36.10, 0),
    (36.10, 37.37, 1),  # vapeur (suite)
    (39.00, 40.70, 1),
    (40.70, 46.10, 0),  # table
    (55.50, 59.87, 1),  # toilettes
    (51.97, 55.50, 0),
    (46.57, 51.00, 1),  # sacs poubelle (plan large)
    (59.87, 64.73, 0),  # poubelle (mains)
    (69.87, 73.85, 1),  # final : l'escalier du jet
]
f = []; labels = []
for i, (a, b, m) in enumerate(SEGS):
    f.append(f"[0:v]trim=start={a}:end={b},setpts=PTS-STARTPTS{',hflip' if m else ''}[v{i}]")
    labels.append(f"[v{i}]")
f.append("".join(labels) + f"concat=n={len(SEGS)}:v=1:a=0,format=yuv420p[v]")
dur = sum(b - a for a, b, _ in SEGS)
print("durée", round(dur, 2))
cmd = ["ffmpeg", "-v", "error", "-y", "-i", SRC, "-f", "lavfi", "-t", f"{dur:.3f}", "-i", "anullsrc=r=48000:cl=stereo",
       "-filter_complex", ";".join(f), "-map", "[v]", "-map", "1:a", "-r", "30",
       "-c:v", "libx264", "-crf", "12", "-preset", "slow", "-c:a", "aac", "-b:a", "320k", "-shortest", "-movflags", "+faststart", OUT]
subprocess.run(cmd, check=True)
