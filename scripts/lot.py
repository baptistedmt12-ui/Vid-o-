"""Chaîne de production du compte allemand (bois fait main). Une étape par commande :

  python3 scripts/lot.py voix   <dossier>            # script-de.txt (4 blocs séparés par une ligne vide) → voix
  python3 scripts/lot.py montage <dossier> <durée>   # rushes/segments.json → travail.mp4 + ambiance.wav + niveaux
  python3 scripts/lot.py rendu  <dossier> <Composition>

<dossier> = videos/NNN-nom. Voix Andrew (edge-tts) : chaque bloc est généré d'un seul élan (vitesse et hauteur
normales), puis les blocs sont mis bout à bout avec une petite pause entre les parties (hook → histoire → fin).
Rien d'autre n'est retouché dans la voix (seuls les blancs de début/fin de bloc sont retirés).
"""
import json, os, re, subprocess, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICE = "en-US-AndrewMultilingualNeural"
GAPS = [0.65, 0.5, 0.6]  # pauses entre les 4 blocs (s)


def sh(*a, **k):
    return subprocess.run(a, check=True, **k)


def dur(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                                capture_output=True, text=True).stdout.strip() or 0)


def tts(text, out):
    for i in range(8):
        if os.path.exists(out):
            os.remove(out)
        subprocess.run(["edge-tts", "--proxy", os.environ.get("HTTPS_PROXY", ""), "--voice", VOICE, "--text", text,
                        "--write-media", out], capture_output=True)
        # une génération coupée en route arrive parfois : on vérifie la durée attendue (~2,3 mots/s au minimum)
        if os.path.exists(out) and dur(out) > len(text.split()) / 4.2:
            return
        time.sleep(3)
    raise SystemExit(f"échec edge-tts : {text[:40]}…")


def voix(d):
    blocks = [b.strip() for b in open(f"{d}/script-de.txt").read().split("\n\n") if b.strip()]
    tmp = f"{d}/rushes/original"
    os.makedirs(tmp, exist_ok=True)
    parts, offs, t = [], [], 0.0
    for i, b in enumerate(blocks):
        mp3, wav = f"{tmp}/bloc{i}.mp3", f"{tmp}/bloc{i}.wav"
        tts(b, mp3)
        trim = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse"
        sh("ffmpeg", "-v", "error", "-y", "-i", mp3, "-af", trim, "-ar", "48000", "-ac", "2", wav)
        parts.append(wav)
        offs.append((t, wav))
        t += dur(wav)
        if i < len(blocks) - 1:
            t += GAPS[min(i, 2)]
            g = f"{tmp}/gap{i}.wav"
            sh("ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-t", str(GAPS[min(i, 2)]), "-i", "anullsrc=r=48000:cl=stereo", g)
            parts.append(g)
    tail = f"{tmp}/tail.wav"
    sh("ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-t", "0.3", "-i", "anullsrc=r=48000:cl=stereo", tail)
    parts.append(tail)
    lst = f"{tmp}/voix.txt"
    open(lst, "w").write("".join(f"file '{os.path.abspath(p)}'\n" for p in parts))
    os.makedirs(f"{d}/assets", exist_ok=True)
    sh("ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c:a", "pcm_s16le", f"{d}/assets/voix.wav")
    # Vérification Whisper (allemand) + minutage des mots
    import numpy as np
    from faster_whisper import WhisperModel
    pad = 0.5  # un demi-seconde de silence devant pour que Whisper n'avale pas le 1er mot
    m = WhisperModel("medium", device="cpu", compute_type="int8")
    W, txt = [], []
    # bloc par bloc : Whisper saute parfois une phrase sur un long fichier
    for off, wav in offs:
        a = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", wav, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"],
                                         capture_output=True).stdout, np.int16).astype(np.float32) / 32768
        a = np.concatenate([np.zeros(int(16000 * pad), np.float32), a, np.zeros(8000, np.float32)])
        segs, _ = m.transcribe(a, language="de", beam_size=5, word_timestamps=True, condition_on_previous_text=False)
        for s in segs:
            txt.append(s.text.strip())
            W += [[round(max(0, w.start - pad) + off, 2), round(w.end - pad + off, 2), w.word.strip()] for w in s.words]
    json.dump(W, open(f"{d}/assets/mots.json", "w"), ensure_ascii=False)
    nid = os.path.basename(d)[:3]
    json.dump({nid: blocks}, open(f"{d}/assets/script.json", "w"), ensure_ascii=False)
    print("WHISPER :", " ".join(txt))
    # comparaison mot à mot avec le script
    import difflib, unicodedata
    def norm(w):
        w = unicodedata.normalize("NFD", w.lower().replace("ß", "ss"))
        return re.sub(r"[^a-z0-9]", "", "".join(c for c in w if unicodedata.category(c) != "Mn"))
    sw = [norm(w) for w in " ".join(blocks).split()]
    ww = [norm(x[2]) for x in W]
    sm = difflib.SequenceMatcher(a=sw, b=ww, autojunk=False)
    diffs = [(op, " ".join(" ".join(blocks).split()[i1:i2]), " ".join(x[2] for x in W[j1:j2]))
             for op, i1, i2, j1, j2 in sm.get_opcodes() if op != "equal"]
    print(f"ÉCARTS script/Whisper ({len(diffs)}) :", diffs)
    ins = [round(b[0] - a_[1], 2) for a_, b in zip(W, W[1:]) if a_[2][-1] not in ".,:;?!“\"»" and b[0] - a_[1] > 0.25]
    print("BLANCS au milieu d'une phrase (> 0,25 s) :", ins)
    print("DURÉE voix :", round(dur(f"{d}/assets/voix.wav"), 2), "s ; dernier mot fini à", W[-1][1], "s ;",
          len(" ".join(blocks).split()), "mots")
    out = f"{ROOT}/src/videos/{os.path.basename(d)}/captions.ts"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    sh("python3", f"{ROOT}/scripts/captions.py", f"{d}/assets/script.json", nid, f"{d}/assets/mots.json", out)
    for f in os.listdir(tmp):
        if re.match(r"(bloc\d+\.(mp3|wav)|gap\d+\.wav|tail\.wav|voix\.txt)$", f):
            os.remove(f"{tmp}/{f}")


def montage(d, total):
    sh("python3", f"{ROOT}/scripts/remodel_seg.py", f"{d}/rushes/original/reel.mkv", f"{d}/rushes/original/travail.mp4",
       f"{d}/rushes/original/ambiance.wav", str(total), f"{d}/rushes/segments.json")
    # dossier public de liens durs pour le rendu
    name = os.path.basename(d)
    pub = f"{ROOT}/out/pub-{name[:3]}/{name}"
    subprocess.run(["rm", "-rf", f"{ROOT}/out/pub-{name[:3]}"])
    os.makedirs(f"{pub}/rushes/original")
    os.makedirs(f"{pub}/assets")
    for f in ("travail.mp4", "ambiance.wav"):
        os.link(f"{d}/rushes/original/{f}", f"{pub}/rushes/original/{f}")
    for f in os.listdir(f"{d}/assets"):
        if f.endswith(".wav"):
            os.link(f"{d}/assets/{f}", f"{pub}/assets/{f}")
    import numpy as np
    a = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", f"{d}/rushes/original/ambiance.wav", "-f", "s16le",
                                      "-ac", "1", "-ar", "8000", "-"], capture_output=True).stdout, np.int16).astype(np.float32) / 32768
    segs = json.load(open(f"{d}/rushes/segments.json"))
    t = 0
    for s in segs:
        L = s[1] - s[0]
        x = a[int(t * 8000):int(min(total, t + L) * 8000)]
        if len(x):
            print(f"plan {t:5.1f}-{t + L:5.1f} : {20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-9):6.1f} dB")
        t += L


def rendu(d, comp):
    name = os.path.basename(d)
    out = f"{d}/export/{name[:3]}-v1.mp4"
    os.makedirs(f"{d}/export", exist_ok=True)
    raw = f"{d}/export/brut.mp4"
    # 10 Mb/s : bien au-dessus du débit des rushes (2–5 Mb/s) → aucune perte visible, et < 100 Mo (pas de LFS)
    sh("npx", "remotion", "render", comp, raw, "--codec=h264", "--video-bitrate=10M", "--x264-preset=slow",
       "--audio-bitrate=320k", "--jpeg-quality=100", f"--public-dir={ROOT}/out/pub-{name[:3]}",
       "--browser-executable=/opt/pw-browsers/chromium", "--concurrency=2", "--log=error", cwd=ROOT)
    sh("ffmpeg", "-v", "error", "-y", "-i", raw, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1:LRA=11", "-ar", "48000",
       "-c:a", "aac", "-b:a", "320k", "-movflags", "+faststart", out)
    os.remove(raw)
    r = subprocess.run(["ffmpeg", "-i", out, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    lufs = re.findall(r"I:\s+(-?[\d.]+) LUFS", r)
    print("RENDU", out, round(os.path.getsize(out) / 1e6, 1), "Mo ;", round(dur(out), 2), "s ;", lufs[-1] if lufs else "?", "LUFS")


if __name__ == "__main__":
    cmd, d = sys.argv[1], os.path.abspath(sys.argv[2])
    {"voix": lambda: voix(d), "montage": lambda: montage(d, float(sys.argv[3])), "rendu": lambda: rendu(d, sys.argv[3])}[cmd]()
