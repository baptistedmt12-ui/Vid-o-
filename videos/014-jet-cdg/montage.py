# Montage 014 : remontage d'une seule vidéo (A), une seule passe d'encodage.
# (source, début, fin, miroir). Partie utile ≈ 0–63,5 s, puis plans inutiles à couper sur TikTok.
import subprocess, sys
A, OUT = sys.argv[1], sys.argv[2]
B = A
SEGS = [
    ("A", 60.93, 62.60, 1),  # accroche : il frotte la moquette (effacer les traces)
    ("A", 3.23, 5.07, 0),    # arrivée en Lamborghini
    ("A", 5.07, 5.47, 0),
    ("A", 5.47, 6.23, 1),    # portière
    ("A", 6.23, 6.70, 0),    # volant
    ("A", 6.70, 8.03, 0),    # sac à outils
    ("A", 14.93, 17.57, 0),  # cabine en plan large (pas de miroir : panneaux EXIT)
    ("A", 8.03, 11.13, 1),   # inspection
    ("A", 13.93, 14.93, 0),  # il pointe le siège
    ("A", 17.57, 24.10, 0),  # nettoyage du siège, plan large
    ("A", 24.10, 27.77, 1),  # siège de près
    ("A", 31.13, 33.30, 0),  # spray sur la moquette (étiquette : pas de miroir)
    ("A", 27.77, 31.10, 1),  # dans l'allée
    ("A", 38.20, 41.10, 1),  # lavabo
    ("A", 41.10, 44.00, 0),  # surfaces noires
    ("A", 36.07, 38.20, 0),
    ("A", 45.40, 49.67, 1),  # boiseries blanches
    ("A", 49.67, 52.80, 0),  # toilettes
    ("A", 52.80, 54.77, 1),
    ("A", 44.00, 45.40, 0),
    ("A", 11.13, 13.93, 1),  # main sur la paroi (traces)
    ("A", 33.30, 34.73, 0),  # outils
    ("A", 34.73, 36.07, 0),  # perceuse
    ("A", 54.77, 56.03, 0),  # frigo
    ("A", 56.03, 59.47, 0),  # canettes
    ("A", 59.47, 60.93, 0),  # il traverse
    ("A", 62.60, 64.60, 0),  # fin : moquette
    # ---- plans non utilisés (à couper sur TikTok) ----
    ("A", 0.00, 2.07, 0),    # début d'origine (texte « $12M Private Jet »)
    ("A", 2.07, 3.23, 0),    # pompe à essence
]
N_UTILE = 27

import os, tempfile
src = {"A": A, "B": B}
tmp = tempfile.mkdtemp(prefix="m013-")
parts = []
for i, (s_, a, b, m) in enumerate(SEGS):
    p = os.path.join(tmp, f"{i:02d}.mkv")
    vf = "fps=30" + (",hflip" if m else "")
    # découpe exacte, sans perte (x264 qp 0)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a}", "-i", src[s_], "-t", f"{b - a:.3f}", "-an", "-vf", vf,
                    "-c:v", "libx264", "-qp", "0", "-preset", "ultrafast", p], check=True)
    parts.append(p)
lst = os.path.join(tmp, "list.txt")
open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
useful = sum(b - a for _, a, b, _ in SEGS[:N_UTILE]); dur = sum(b - a for _, a, b, _ in SEGS)
print("partie utile", round(useful, 2), "durée totale", round(dur, 2))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
    "-map", "0:v", "-map", "1:a", "-r", "30", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-crf", "12", "-preset", "slow",
    "-c:a", "aac", "-b:a", "320k", "-shortest", "-movflags", "+faststart", OUT], check=True)
subprocess.run(["rm", "-rf", tmp])
