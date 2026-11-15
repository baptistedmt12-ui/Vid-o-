"""Nettoyage d'une phrase de voix off : supprime les blancs, les bruits hors parole, puis accélère."""
import subprocess
import numpy as np, soundfile as sf


def nettoie(a, sr, mots, pause=0.14, micro=0.06, plafond=None):
    """a : audio mono ; mots : [(mot, début, fin)] de Whisper.
    Garde uniquement la parole ; pauses réelles ramenées à `pause`, micro-coupures à `micro`.
    Avec `plafond`, les pauses gardent leur durée naturelle (silence propre), limitée à `plafond`."""
    hop = int(sr * 0.005)
    win = int(sr * 0.02)
    n = max(1, (len(a) - win) // hop)
    rms = np.array([np.sqrt(np.mean(a[i * hop : i * hop + win] ** 2)) for i in range(n)])
    ref = np.percentile(rms, 95)
    parle = rms > ref * 0.045
    # uniquement là où Whisper entend des mots (élimine souffles, clics, bruits de micro)
    permis = np.zeros(n, bool)
    for _, d, f in mots:
        permis[max(0, int((d - 0.10) * sr / hop)) : int((f + 0.14) * sr / hop)] = True
    parle &= permis
    # segments de parole
    segs, i = [], 0
    while i < n:
        if parle[i]:
            j = i
            while j < n and parle[j]:
                j += 1
            segs.append([i, j])
            i = j
        else:
            i += 1
    # fusionne les trous < 60 ms, retire les îlots < 50 ms
    fus = []
    for s in segs:
        if fus and (s[0] - fus[-1][1]) * hop / sr < 0.06:
            fus[-1][1] = s[1]
        else:
            fus.append(s)
    fus = [s for s in fus if (s[1] - s[0]) * hop / sr >= 0.05]
    if not fus:
        return a
    out = []
    f = int(sr * 0.006)
    for k, (i, j) in enumerate(fus):
        d = max(0, i * hop - int(sr * 0.015))
        e = min(len(a), j * hop + win + int(sr * 0.03))
        x = a[d:e].copy()
        x[:f] *= np.linspace(0, 1, f)
        x[-f:] *= np.linspace(1, 0, f)
        if k:
            trou = (i - fus[k - 1][1]) * hop / sr
            d_pause = min(trou, plafond) if plafond else (pause if trou > 0.3 else min(trou, micro))
            out.append(np.zeros(int(sr * d_pause), dtype="float32"))
        out.append(x)
    return np.concatenate(out).astype("float32")


def tempo(a, sr, facteur):
    """Accélère sans changer la hauteur (ffmpeg atempo)."""
    if abs(facteur - 1) < 0.005:
        return a
    p = subprocess.run(
        ["ffmpeg", "-nostdin", "-loglevel", "error", "-f", "f32le", "-ar", str(sr), "-ac", "1", "-i", "pipe:0", "-af", f"atempo={facteur}", "-f", "f32le", "pipe:1"],
        input=a.astype("float32").tobytes(),
        capture_output=True,
        check=True,
    )
    return np.frombuffer(p.stdout, dtype="float32").copy()
