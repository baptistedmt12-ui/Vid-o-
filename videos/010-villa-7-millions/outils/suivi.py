"""Suivi des éléments entourés / fléchés (OpenCV CSRT) -> src/videos/010-villa-7-millions/tracks.json
Coordonnées en pixels du rush (1080x1920), temps en secondes du rush."""
import cv2, json, sys
RUSH = sys.argv[1]; OUT = sys.argv[2]
# id: (début s, fin s, boîte x,y,l,h au début)
CIBLES = {
  "maison":    (0.30, 3.40, (470, 600, 250, 360)),
  "porte":     (2.00, 3.40, (300, 740, 125, 140)),
  "escalier":  (7.00, 8.45, (330, 600, 450, 210)),
  "cheminee":  (12.6, 14.4, (880, 1000, 190, 330)),
  "ilot":      (30.0, 33.0, (60, 1030, 610, 400)),
  "hotte":     (40.5, 42.5, (280, 440, 420, 370)),
  "baignoire": (49.0, 50.6, (760, 1140, 315, 620)),
  "lustre":    (52.3, 54.0, (350, 860, 245, 330)),
  "piscine":   (60.5, 62.0, (200, 1080, 600, 300)),
  "canape":    (15.2, 16.8, (346, 1015, 518, 280)),
  "bouteilles":(18.0, 21.0, (300, 650, 260, 540)),
  "fenetres":  (25.5, 28.5, (216, 500, 346, 280)),
  "led":       (38.0, 40.0, (330, 1200, 110, 230)),
  "anneau":    (44.0, 46.5, (600, 345, 300, 200)),
  "miroir":    (47.8, 49.5, (710, 690, 155, 325)),
  "jeux":      (57.0, 60.3, (475, 1030, 260, 220)),
  "arches":    (10.5, 12.0, (300, 150, 500, 380)),
  "mezz":      (52.3, 54.0, (170, 1080, 160, 230)),
  "canape2":   (15.2, 16.6, (100, 1000, 800, 400)),
  "poutres":   (44.0, 46.5, (480, 400, 250, 330)),
  "douche":    (49.6, 50.6, (700, 700, 300, 450)),
  "mezz2":     (52.4, 54.0, (420, 1100, 220, 280)),
}
S = 0.5
cap = cv2.VideoCapture(RUSH); fps = cap.get(cv2.CAP_PROP_FPS)
res = {}
for k, (t0, t1, (x, y, w, h)) in CIBLES.items():
    cap.set(cv2.CAP_PROP_POS_FRAMES, round(t0 * fps))
    ok, fr = cap.read(); sm = cv2.resize(fr, None, fx=S, fy=S)
    tr = cv2.TrackerCSRT_create(); tr.init(sm, tuple(int(v * S) for v in (x, y, w, h)))
    pts = [[round(t0, 3), x + w / 2, y + h / 2, w, h]]
    n = round((t1 - t0) * fps)
    for i in range(1, n):
        ok, fr = cap.read()
        if not ok: break
        ok, b = tr.update(cv2.resize(fr, None, fx=S, fy=S))
        bx, by, bw, bh = (v / S for v in b)
        pts.append([round(t0 + i / fps, 3), round(bx + bw / 2, 1), round(by + bh / 2, 1), round(bw, 1), round(bh, 1)])
    res[k] = pts
    print(k, len(pts), pts[0][1:3], '->', pts[-1][1:3])
# Deux escaliers du hall : positions déduites du palier central (symétriques, suivent le zoom)
res["escalier-g"] = [[t, cx - 0.7 * w, cy + 0.7 * w, 120, 120] for t, cx, cy, w, h in res["escalier"]]
res["escalier-d"] = [[t, cx + 0.7 * w, cy + 0.7 * w, 120, 120] for t, cx, cy, w, h in res["escalier"]]
# Maison entière (accroche) : centre de la façade, au-dessus de la porte
res["maison-facade"] = [[t, cx, cy - 110, 120, 120] for t, cx, cy, w, h in res["maison"]]
# Plafond en arches : il occupe tout le haut de l'image -> point fixe au centre des arches
res["arches-fixe"] = [[round(9.8 + i / 60, 3), 540, 420, 300, 200] for i in range(int(2.6 * 60))]
json.dump(res, open(OUT, "w"))
