"""Suivi des éléments fléchés (OpenCV CSRT, dans les deux sens depuis une image de référence).
Usage : python3 suivi.py <dossier rushes/original> <sortie tracks.json>
Coordonnées en pixels du rush (1080x1920), temps en secondes du rush. Clés « v1:nom » / « v2:nom »."""
import cv2, json, sys
R, OUT = sys.argv[1], sys.argv[2]
# clé: (rush, début, référence, fin, boîte x,y,l,h à la référence)
CIBLES = {
  "v2:mezzanine": ("v2", 7.0, 8.0, 10.0, (400, 230, 400, 200)),
  "v2:ilot":      ("v2", 22.5, 24.0, 27.5, (250, 950, 500, 300)),
  "v2:poutres":   ("v2", 36.2, 37.0, 39.5, (500, 230, 350, 200)),
  "v2:coursive":  ("v2", 46.0, 47.5, 50.0, (600, 1200, 200, 300)),
  "v2:piscine":   ("v2", 33.2, 33.5, 36.0, (150, 1250, 500, 220)),
  "v2:terrain":   ("v2", 52.3, 53.0, 56.5, (200, 1300, 600, 300)),
  "v1:biblio":    ("v1", 9.0, 9.8, 11.5, (150, 500, 500, 500)),
  "v1:cave":      ("v1", 15.5, 17.0, 19.5, (40, 400, 300, 700)),
  "v1:baignoire": ("v1", 33.0, 35.0, 38.0, (250, 1250, 500, 200)),
  "v1:escalier":  ("v1", 41.0, 42.5, 43.9, (560, 700, 350, 600)),
  "v1:cinema":    ("v1", 48.8, 49.5, 51.8, (150, 880, 700, 300)),
  # rafale
  "v2:piscine-soir": ("v2", 59.6, 59.8, 60.8, (200, 1000, 500, 220)),
  "v2:ecran":     ("v2", 50.85, 51.5, 52.1, (560, 790, 500, 240)),
  "v1:sport":     ("v1", 44.2, 44.4, 45.6, (350, 750, 280, 500)),
  "v1:billard":   ("v1", 45.8, 46.3, 47.3, (300, 1100, 500, 300)),
}
S = 0.5
caps = {v: cv2.VideoCapture(f"{R}/{v}.mp4") for v in ("v1", "v2")}
def suivre(frames, box):
    tr = cv2.TrackerCSRT_create(); tr.init(cv2.resize(frames[0], None, fx=S, fy=S), tuple(int(v * S) for v in box))
    out = [box]
    for fr in frames[1:]:
        ok, b = tr.update(cv2.resize(fr, None, fx=S, fy=S)); out.append(tuple(v / S for v in b))
    return out
res = {}
for k, (v, ta, tref, tb, box) in CIBLES.items():
    cap = caps[v]; fps = cap.get(cv2.CAP_PROP_FPS)
    cap.set(cv2.CAP_PROP_POS_FRAMES, round(ta * fps))
    frs = [cap.read()[1] for _ in range(round((tb - ta) * fps))]
    frs = [f for f in frs if f is not None]
    iref = min(len(frs) - 1, round((tref - ta) * fps))
    arr = suivre(frs[iref::-1], box)[::-1] + suivre(frs[iref:], box)[1:]
    res[k] = [[round(ta + i / fps, 3), round(x + w / 2, 1), round(y + h / 2, 1), round(w, 1), round(h, 1)] for i, (x, y, w, h) in enumerate(arr)]
    print(k, len(arr))
# Points visés remontés (le suivi accroche le bord, la cible est juste au-dessus)
res["v1:baignoire-haut"] = [[t, cx, cy - 130, w, h] for t, cx, cy, w, h in res["v1:baignoire"]]
res["v2:ilot-marbre"] = [[t, cx + 40, cy + 330, w, h] for t, cx, cy, w, h in res["v2:ilot"]]
res["v2:piscine-eau"] = [[t, cx, cy - 70, w, h] for t, cx, cy, w, h in res["v2:piscine"]]
json.dump(res, open(OUT, "w"))
