"""Suivi des éléments fléchés (OpenCV CSRT, dans les deux sens depuis une image de référence).
Usage : python3 suivi.py <dossier rushes/original> <sortie tracks.json>
Rushes : t = tiktok-1080.mp4 (1080x1920), p = pinterest.mp4 (720x1280, positions ramenées en 1080x1920).
Boîtes données en pixels du rush d'origine. Sortie : temps en s du rush, positions en espace 1080x1920."""
import cv2, json, sys
R, OUT = sys.argv[1], sys.argv[2]
FICHIERS = {"t": "tiktok-1080.mp4", "p": "pinterest.mp4"}
CIBLES = {
  "t:maison":     ("t", 0.0, 0.3, 3.0, (420, 600, 300, 300)),
  "t:escalier":   ("t", 13.0, 15.0, 19.0, (250, 700, 350, 400)),
  "t:bar":        ("t", 21.5, 22.5, 24.5, (620, 500, 330, 400)),
  "t:lustres":    ("t", 26.0, 27.0, 28.5, (500, 330, 220, 300)),
  "t:cave":       ("t", 30.0, 31.0, 32.5, (200, 500, 400, 600)),
  "t:ilot":       ("t", 38.5, 40.0, 42.0, (150, 1100, 600, 350)),
  "t:baignoire":  ("t", 51.0, 52.0, 54.0, (130, 1130, 300, 300)),
  "t:mezzanine":  ("t", 55.0, 55.5, 57.5, (250, 950, 300, 300)),
  "t:piscine":    ("t", 59.3, 59.7, 60.7, (250, 1250, 500, 300)),
  "p:piscine":    ("p", 16.0, 17.0, 20.0, (150, 800, 400, 180)),
  "p:lac":        ("p", 48.6, 49.0, 50.2, (440, 330, 270, 150)),
  # v2 : un élément fléché à chaque plan
  "t:canape":     ("t", 44.5, 46.2, 47.0, (380, 1250, 500, 350)),
  "t:tete-lit":   ("t", 48.0, 49.0, 50.5, (20, 770, 220, 290)),
  "p:baie":       ("p", 56.5, 57.5, 59.5, (352, 497, 177, 259)),
  "p:lit":        ("p", 79.8, 80.5, 82.0, (200, 800, 350, 250)),
  "t:ecran":      ("t", 57.6, 58.3, 59.3, (430, 810, 300, 180)),
  "t:facade":     ("t", 7.5, 9.0, 11.4, (500, 300, 380, 450)),
}
S = 0.5
def suivre(frames, box, s):
    tr = cv2.TrackerCSRT_create(); tr.init(cv2.resize(frames[0], None, fx=s, fy=s), tuple(int(v * s) for v in box))
    out = [box]
    for fr in frames[1:]:
        ok, b = tr.update(cv2.resize(fr, None, fx=s, fy=s)); out.append(tuple(v / s for v in b))
    return out
res = {}
for k, (v, ta, tref, tb, box) in CIBLES.items():
    cap = cv2.VideoCapture(f"{R}/{FICHIERS[v]}"); fps = cap.get(cv2.CAP_PROP_FPS)
    cap.set(cv2.CAP_PROP_POS_FRAMES, round(ta * fps))
    frs = [f for f in (cap.read()[1] for _ in range(round((tb - ta) * fps))) if f is not None]
    iref = min(len(frs) - 1, round((tref - ta) * fps))
    s = S if v == "t" else 1.0
    arr = suivre(frs[iref::-1], box, s)[::-1] + suivre(frs[iref:], box, s)[1:]
    k15 = 1080 / frs[0].shape[1]  # ramène en espace 1080x1920
    res[k] = [[round(ta + i / fps, 3), round((x + w / 2) * k15, 1), round((y + h / 2) * k15, 1), round(w * k15, 1), round(h * k15, 1)] for i, (x, y, w, h) in enumerate(arr)]
    print(k, len(arr))
# Lac : il occupe tout le milieu de l'image -> point fixe (espace 1080x1920)
res["p:lac-fixe"] = [[round(48.6 + i / 30, 3), 540, 1150, 300, 120] for i in range(int(1.6 * 30))]
json.dump(res, open(OUT, "w"))
