"""Suivi des éléments fléchés (OpenCV CSRT, dans les deux sens depuis une image de référence).
Usage : python3 suivi.py <dossier rushes/original> <sortie tracks.json>
Rushes : t = principale.mp4 (1080x1920), m = moderne.mp4 (576x1024), c = cathedrale.mp4 (720x1280).
Boîtes en pixels du rush d'origine ; sortie en espace 1080x1920, temps en s du rush."""
import cv2, json, sys
R, OUT = sys.argv[1], sys.argv[2]
FICHIERS = {"t": "principale.mp4", "m": "moderne.mp4", "c": "cathedrale.mp4"}
CIBLES = {
  "t:maison":   ("t", 2.3, 2.5, 5.0, (470, 610, 140, 170)),
  "t:cascade":  ("t", 5.15, 6.0, 6.45, (120, 600, 420, 220)),
  "t:feu":      ("t", 8.0, 9.5, 12.0, (180, 1100, 330, 140)),
  "t:billard":  ("t", 13.25, 13.8, 15.0, (180, 1060, 460, 240)),
  "t:panier":   ("t", 19.5, 20.5, 22.65, (70, 760, 170, 120)),
  "t:ilot":     ("t", 33.2, 34.0, 36.0, (200, 1000, 600, 300)),
  "t:bar":      ("t", 50.0, 51.0, 52.9, (100, 450, 400, 400)),
  "t:lit":      ("t", 53.1, 54.0, 55.5, (650, 1000, 380, 220)),
  "t:baignoire":("t", 55.7, 56.5, 58.9, (380, 1000, 300, 200)),
  "t:tapis":    ("t", 59.05, 59.5, 60.5, (250, 1270, 580, 330)),
  "m:baignoire":("m", 7.0, 7.5, 8.55, (125, 600, 250, 110)),
  "m:cave":     ("m", 10.0, 10.5, 11.55, (30, 150, 110, 400)),
  "m:bureau":   ("m", 11.65, 12.0, 13.15, (140, 520, 260, 130)),
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
    k15 = 1080 / frs[0].shape[1]
    res[k] = [[round(ta + i / fps, 3), round((x + w / 2) * k15, 1), round((y + h / 2) * k15, 1), round(w * k15, 1), round(h * k15, 1)] for i, (x, y, w, h) in enumerate(arr)]
    print(k, len(arr))
# Points fixes (éléments qui remplissent l'image) en espace 1080x1920
def fixe(t0, t1, x, y, fps=30): return [[round(t0 + i / fps, 3), x, y, 200, 120] for i in range(int((t1 - t0) * fps))]
res["t:poutres"] = fixe(23.0, 33.0, 540, 330)
res["t:vue"] = fixe(36.5, 41.0, 560, 820)
res["c:verriere"] = fixe(0.0, 7.6, 800, 620)
json.dump(res, open(OUT, "w"))
