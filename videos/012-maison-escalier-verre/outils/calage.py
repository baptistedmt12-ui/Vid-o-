"""Calage du montage sur la voix réelle : coupes 0,08 s avant chaque phrase, flèches sur leur mot.
Écrit SEGS, ANNOTS, PRIX, VILLE, CHOIX, VOIX dans src/videos/012-maison-escalier-verre/timeline.ts.
Usage (depuis la racine du dépôt) : python3 videos/012-maison-escalier-verre/outils/calage.py"""
import json, re, soundfile as sf
V = 'videos/012-maison-escalier-verre/assets/voix/'
W = json.load(open(V + 'voix-mots.json'))
END = round(sf.info(V + 'voix-complete.wav').duration + 0.15, 2)
words = [w for t, w in W]
def find(seq, start=0):
    i = start
    while words[i:i + len(seq)] != seq: i += 1
    return i
# (id, rush, src0, src1, options, premiers mots du plan)
P = [('intro-escalier', 't', 17.0, 18.2, dict(mirror=True, punch=True), ['Un', 'escalier']),
     ('intro-piscine', 't', 59.5, 60.7, dict(punch=True, zoom='in'), ['et', 'une', 'piscine']),
     ('facade', 't', 0.0, 3.0, dict(zoom='in'), ['Bienvenue']),
     ('allee', 't', 8.0, 11.4, dict(zoom='in'), ['Reste']),
     ('entree', 't', 14.2, 18.5, dict(punch=True), ["L'entrée"]),
     ('salon', 't', 21.0, 24.5, dict(punch=True), ['Le', 'salon']),
     ('salle-a-manger', 't', 25.5, 29.0, dict(mirror=True, punch=True), ['La', 'salle', 'à', 'manger']),
     ('cave', 't', 29.5, 32.5, dict(mirror=True, punch=True), ['et', 'juste']),
     ('cuisine', 't', 37.5, 44.0, dict(punch=True), ['La', 'cuisine']),
     ('salon-2', 't', 45.3, 47.0, dict(mirror=True, punch=True), ['Le', 'deuxième']),
     ('cta-ville', 'p', 6.5, 10.0, dict(punch=True, zoom='in'), ['et', "d'ailleurs"]),
     ('mezzanine', 't', 55.0, 57.5, dict(mirror=True, punch=True), ["À", "l'étage"]),
     ('suite', 't', 48.0, 50.5, dict(punch=True), ['la', 'suite']),
     ('salle-de-bain', 't', 50.8, 54.5, dict(punch=True), ['et', 'sa', 'salle']),
     ('chambre-amis-1', 'p', 56.5, 59.5, dict(punch=True), ['Deux', 'chambres']),
     ('chambre-amis-2', 'p', 79.8, 82.0, dict(mirror=True, punch=True), ['pour', 'la', 'belle-famille']),
     ('balcon', 'p', 47.8, 50.4, dict(punch=True, zoom='in'), ['Un', 'balcon']),
     ('cinema', 't', 57.95, 59.3, dict(punch=True, zoom='in'), ['un', 'cinéma']),
     ('piscine-jour', 'p', 17.0, 19.6, dict(punch=True, zoom='in'), ['et', 'la', 'piscine']),
     ('piscine-nuit', 't', 59.5, 60.7, dict(mirror=True, zoom='in'), ['et', 'la', 'nuit']),
     ('fin-1', 't', 7.5, 11.4, dict(mirror=True, zoom='in'), ['Alors']),
     ('fin-2', 't', 0.0, 3.0, dict(mirror=True, zoom='in'), ['un', 'tu', 'signes'])]
# (plan, piste, fenêtre valide, mot, occurrence dans le plan, direction, son)
A = [('intro-escalier', 't:escalier', (17.0, 18.2), 'escalier', 0, 'bas-gauche', None),
     ('intro-piscine', 't:piscine', (59.5, 60.7), 'piscine', 0, 'haut-droite', 'plouf'),
     ('entree', 't:escalier', (14.2, 18.0), 'escalier', 0, 'bas-droite', 'scintille'),
     ('salon', 't:bar', (22.0, 24.0), 'bar', 0, 'bas-gauche', 'pop'),
     ('salle-a-manger', 't:lustres', (26.0, 28.5), 'lustres', 0, 'bas-droite', None),
     ('cave', 't:cave', (30.0, 32.5), 'cave', 0, 'bas-gauche', 'verre'),
     ('cuisine', 't:ilot', (39.0, 40.4), 'îlot', 0, 'haut-droite', 'pop'),
     ('salon-2', 't:canape', (45.7, 47.0), 'canapé', 0, 'haut-droite', 'coussin'),
     ('mezzanine', 't:mezzanine', (55.2, 56.2), 'mezzanine', 0, 'haut-droite', None),
     ('suite', 't:tete-lit', (48.8, 50.5), 'tête', 0, 'bas-droite', None),
     ('salle-de-bain', 't:baignoire', (51.5, 54.0), 'baignoire', 0, 'haut-droite', 'pop'),
     ('chambre-amis-1', 'p:baie', (57.0, 59.4), 'baies', 0, 'bas-gauche', None),
     ('chambre-amis-2', 'p:lit', (80.1, 81.2), 'belle-famille', 0, 'haut-droite', None),
     ('balcon', 'p:lac-fixe', (48.6, 50.2), 'lac', 0, 'haut-droite', None),
     ('cinema', 't:ecran', (58.1, 59.3), 'écran', 0, 'bas-droite', None),
     ('piscine-jour', 'p:piscine', (16.6, 20.0), 'piscine', 0, 'haut-droite', 'plouf'),
     ('piscine-nuit', 't:piscine', (59.5, 60.7), 'nuit', 0, 'haut-gauche', 'scintille'),
     ('fin-1', 't:facade', (8.8, 11.4), 'Marseille', 0, 'bas-droite', None)]
idx = 0; st = []
for p in P:
    i = find(p[5], idx); st.append((i, W[i][0])); idx = i + 1
segs = []
for k, p in enumerate(P):
    t0 = 0.0 if k == 0 else round(st[k][1] - 0.08, 3); t1 = END if k == len(P) - 1 else round(st[k + 1][1] - 0.08, 3)
    j = st[k + 1][0] if k + 1 < len(P) else len(W)
    segs.append(dict(id=p[0], rush=p[1], src0=p[2], src1=p[3], o=p[4], out0=t0, out1=t1, dur=round(t1 - t0, 3),
                     voix=' '.join(w for t, w in W[st[k][0]:j])))
segd = {s['id']: s for s in segs}; ann = []
for seg, tr, (a, b), mot, occ, d, son in A:
    s = segd[seg]
    occs = [t for t, w in W if w.lower().startswith(mot.lower()) and s['out0'] - 0.3 <= t <= s['out1']]
    tw = 0.3 if seg == 'intro-escalier' else (occs[min(occ, len(occs) - 1)] if occs else s['out0'] + 0.3)
    k = max(0.0, tw - 0.1 - s['out0']); rate = (s['src1'] - s['src0']) / s['dur']; src = s['src0'] + k * rate
    if src < a and k < s['dur'] * 0.9:
        n = (a - k * s['src1'] / s['dur']) / (1 - k / s['dur'])
        if s['src0'] < n < s['src1'] - 0.6 and 0.4 <= (s['src1'] - n) / s['dur'] <= 2.2:
            s['src0'] = round(n, 3); rate = (s['src1'] - n) / s['dur']; src = a
    src = min(max(src, a), b - 0.15); real = s['out0'] + (src - s['src0']) / rate
    ann.append(dict(seg=seg, track=tr, src0=round(src, 3), src1=round(min(b, s['src1']), 3), dir=d, son=son, mot=tw, real=real, phrase=mot))
for x in ann: print(f"{x['seg']:16} mot {x['mot']:6.2f} flèche {x['real']:6.2f} écart {x['real'] - x['mot']:+.2f}")
for s in segs: print(f"{s['id']:16} {s['out0']:6.2f}-{s['out1']:6.2f} x{(s['src1'] - s['src0']) / s['dur']:.2f}")
tm = [t for t, w in W if w == 'Marseille'][0]; tq = [t for t, w in W if w == 'quatre'][0]
th = [t for t, w in W if w == 'honnête'][-1]; tun = [t for t, w in W if w == 'un' and t > th][0]; tdeux = [t for t, w in W if w == 'deux' and t > th][0]
js = lambda v: json.dumps(v, ensure_ascii=False)
L = [f'  {{ id: {js(s["id"])}, rush: {js(s["rush"])}, src0: {s["src0"]}, src1: {s["src1"]}, dur: {s["dur"]}' + ''.join(f', {k}: {js(v)}' for k, v in s['o'].items()) + f', voix: {js(s["voix"])} }},' for s in segs]
AL = [f'  {{ seg: {js(x["seg"])}, track: {js(x["track"])}, src0: {x["src0"]}, src1: {x["src1"]}, dir: {js(x["dir"])}' + (f', son: {js(x["son"])}' if x['son'] else '') + f', phrase: {js(x["phrase"])} }},' for x in ann]
p = 'src/videos/012-maison-escalier-verre/timeline.ts'; t = open(p).read()
a = t.index('export const SEGS: Seg[] = ['); b = t.index('];', a) + 2
t = t[:a] + 'export const SEGS: Seg[] = [\n' + '\n'.join(L) + '\n];' + t[b:]
a = t.index('export const ANNOTS: Annot[] = ['); b = t.index('];', a) + 2
t = t[:a] + 'export const ANNOTS: Annot[] = [\n' + '\n'.join(AL) + '\n];' + t[b:]
t = re.sub(r'export const PRIX = \{.*?\};', f'export const PRIX = {{ from: {round(tq - 0.1, 2)}, to: {round(segd["allee"]["out1"], 2)}, texte: "450 000 €" }};', t, flags=re.S)
t = re.sub(r'export const VILLE = \{.*?\};', f'export const VILLE = {{ t: {round(tm - 0.05, 2)}, dur: 1.5, texte: "MARSEILLE" }};', t, flags=re.S)
a = t.index('export const CHOIX = ['); b = t.index('];', a) + 2
t = t[:a] + f'export const CHOIX = [\n  {{ t: {round(tun - 0.08, 2)}, n: "1", texte: "je signe tout de suite" }},\n  {{ t: {round(tdeux - 0.08, 2)}, n: "2", texte: "c\'est une arnaque" }},\n];' + t[b:]
open(p, 'w').write(t)
print('END', END)
