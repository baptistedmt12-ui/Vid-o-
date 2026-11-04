"""Recale les temps d'une composition sur une nouvelle voix off.

Usage : python3 scripts/retime.py <Video.tsx> <anciens mots.json> <nouveaux mots.json>
Aligne les deux transcriptions (Whisper) mot à mot, puis convertit chaque temps lié à la voix
(t=, from=, to=, t0/t1, tHit…, sec(…), listes de bruitages, zooms) par interpolation entre mots communs.
Les coupes du rush (bloc CUTS) ne bougent pas.
"""
import bisect, difflib, json, re, sys, unicodedata

tsx, old_p, new_p = sys.argv[1:4]

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in w if unicodedata.category(c) != "Mn"))

def merged(p):
    out = []
    for s, e, w in json.load(open(p)):
        if out and (w.startswith("'") or w.startswith("-")):
            out[-1][2] += w
        else:
            out.append([s, e, w])
    return out

A, B = merged(old_p), merged(new_p)
sm = difflib.SequenceMatcher(a=[norm(x[2]) for x in A], b=[norm(x[2]) for x in B], autojunk=False)
anchors = [(0.0, 0.0)]
for blk in sm.get_matching_blocks():
    for i in range(blk.size):
        a, b = A[blk.a + i], B[blk.b + i]
        if a[0] > anchors[-1][0] and b[0] > anchors[-1][1]:
            anchors.append((a[0], b[0]))
last_old, last_new = A[-1][1], B[-1][1]
anchors.append((max(last_old, anchors[-1][0] + 0.01), max(last_new, anchors[-1][1] + 0.01)))
xs = [a for a, _ in anchors]

def m(t):
    if t >= xs[-1]:
        return anchors[-1][1] + (t - xs[-1])
    i = bisect.bisect_right(xs, t) - 1
    (x0, y0), (x1, y1) = anchors[i], anchors[i + 1]
    return y0 + (y1 - y0) * (t - x0) / (x1 - x0)

src = open(tsx).read()
cs, ce = src.index("const CUTS"), src.index("];", src.index("const CUTS"))
head, cuts, tail = src[:cs], src[cs:ce], src[ce:]
NUM = r"(\d+(?:\.\d+)?)"
def fix(code):
    f = lambda mm: mm.group(1) + f"{round(m(float(mm.group(2))), 2)}"
    code = re.sub(r"(\b(?:t|from|to|t0|t1|tHit|tLabel|tLight|tHead|tPaid|tSeen|enterAt|darkFrom)=\{)" + NUM, f, code)
    code = re.sub(r"(\{\s*t:\s*)" + NUM, f, code)
    code = re.sub(r"(\bsec\()" + NUM, f, code)
    code = re.sub(r"(\breveal=\{\{\s*t:\s*)" + NUM, f, code)
    # listes de bruitages : {[0.05, 2.16, ...].map(
    def lst(mm):
        nums = [f"{round(m(float(x)), 2)}" for x in re.findall(NUM, mm.group(1))]
        return "{[" + ", ".join(nums) + "].map("
    code = re.sub(r"\{\[([\d.,\s]+)\]\.map\(", lst, code)
    return code
out = fix(head) + cuts + fix(tail)
out = re.sub(r"to=\{DURATION_S\}", "to={DURATION_S}", out)
open(tsx, "w").write(out)
print(tsx, len(anchors), "points d'ancrage ; fin voix", round(last_old, 2), "→", round(last_new, 2))
