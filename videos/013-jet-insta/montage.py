# Montage 013 : mix de deux Reels (A = principale, B = plans d'appoint), une seule passe ffmpeg.
# (source, début, fin, miroir). Partie utile ≈ 0–63,5 s, puis plans inutiles à couper sur TikTok.
import subprocess, sys
A, B, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
SEGS = [
    ("A", 67.60, 70.00, 1),  # accroche : polissage de l'aile
    ("B", 25.57, 27.20, 0),  # arrivée : marche sur le tapis bleu
    ("B", 27.20, 27.97, 0),  # le jet
    ("A", 8.10, 9.37, 0),    # le jet dans le hangar
    ("B", 33.03, 34.90, 1),  # montée des escaliers
    ("A", 9.37, 13.67, 0),   # inspection (nez, porte, train)
    ("A", 20.20, 21.60, 1),  # devant le nez, échelle (avant l'étiquette d'avertissement)
    ("B", 36.63, 38.80, 0),  # intérieur (plan d'appoint)
    ("A", 26.97, 32.00, 0),  # nettoyage du nez et des trappes
    ("A", 33.27, 39.10, 1),  # fuselage en plan large
    ("A", 39.10, 43.73, 0),  # moteur, sur l'échelle
    ("B", 40.57, 42.17, 1),  # sièges (plan d'appoint)
    ("A", 43.73, 47.60, 0),  # moteur de près
    ("B", 46.97, 49.60, 1),  # intérieur, table (plan d'appoint)
    ("A", 47.60, 51.70, 1),  # aile en plan large
    ("A", 51.70, 54.53, 0),  # polisseuse
    ("A", 54.53, 58.30, 1),  # polissage / trappe du train
    ("A", 58.30, 62.70, 0),  # allongé sous l'avion
    ("A", 62.70, 67.60, 1),  # sous le fuselage
    ("B", 58.13, 58.77, 0),  # jet à l'extérieur
    ("A", 70.00, 72.90, 0),  # fin : polissage
    # ---- plans inutiles (à couper sur TikTok) ----
    ("A", 2.03, 7.43, 0),    # rivière / forêt
    ("B", 3.97, 8.60, 1),    # chambre d'hôtel
    ("B", 12.43, 16.17, 0),  # vue du hublot au décollage
]
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
useful = sum(b - a for _, a, b, _ in SEGS[:21]); dur = sum(b - a for _, a, b, _ in SEGS)
print("partie utile", round(useful, 2), "durée totale", round(dur, 2))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
    "-map", "0:v", "-map", "1:a", "-r", "30", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-crf", "12", "-preset", "slow",
    "-c:a", "aac", "-b:a", "320k", "-shortest", "-movflags", "+faststart", OUT], check=True)
subprocess.run(["rm", "-rf", tmp])
