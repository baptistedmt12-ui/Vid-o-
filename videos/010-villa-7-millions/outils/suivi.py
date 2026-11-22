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
json.dump(res, open(OUT, "w"))
