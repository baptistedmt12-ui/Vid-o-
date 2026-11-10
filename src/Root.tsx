import "./fonts";
import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Video001 } from "./videos/001-video-001/Video001";
import { FPS, TOTAL_FRAMES } from "./videos/001-video-001/timeline";
import { Video002 } from "./videos/002-etiquette-arrachee/Video002";
import * as T002 from "./videos/002-etiquette-arrachee/timeline";
import { Video003 } from "./videos/003-defi-15-15-7/Video003";
import * as V3 from "./videos/003-defi-15-15-7/reps";
import { Video004, TOTAL_FRAMES as F004 } from "./videos/004-boue-rouge/Video004";
import { Video005, TOTAL_FRAMES as F005 } from "./videos/005-compteur-location/Video005";

import { Video006, FPS as FPS006, TOTAL_FRAMES as TOTAL006 } from "./videos/006-on-air-chambly/Video006";
import { Video007 } from "./videos/007-inox-muscu/Video007";
import { FPS as FPS007, TOTAL_FRAMES as TOTAL007 } from "./videos/007-inox-muscu/timeline";
import { Video008 } from "./videos/008-jet-raciste-test/Video008";
import { TOTAL_FRAMES as TOTAL008 } from "./videos/008-jet-raciste-test/timeline";
import { Video009 } from "./videos/009-scooter-nettoyage/Video009";
import { TOTAL_FRAMES as TOTAL009 } from "./videos/009-scooter-nettoyage/timeline";
import { Video010 } from "./videos/010-aliengarage-1/Video010";
import { TOTAL_FRAMES as TOTAL010 } from "./videos/010-aliengarage-1/timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ title: "Bienvenue sur Vid-o-" }}
      />
      <Composition
        id="Video001"
        component={Video001}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Video002"
        component={Video002}
        durationInFrames={T002.TOTAL_FRAMES}
        fps={T002.FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Video003"
        component={Video003}
        durationInFrames={V3.TOTAL_FRAMES}
        fps={V3.FPS}
        width={1080}
        height={1920}
      />
      <Composition id="Video004" component={Video004} durationInFrames={F004} fps={30} width={1080} height={1920} />
      <Composition id="Video005" component={Video005} durationInFrames={F005} fps={30} width={1080} height={1920} />
      <Composition
        id="Video006"
        component={Video006}
        durationInFrames={TOTAL006}
        fps={FPS006}
        width={1080}
        height={1920}
      />
      <Composition
        id="Video007"
        component={Video007}
        durationInFrames={TOTAL007}
        fps={FPS007}
        width={1080}
        height={1920}
      />
      <Composition
        id="Video007SansMusique"
        component={Video007}
        durationInFrames={TOTAL007}
        fps={FPS007}
        width={1080}
        height={1920}
        defaultProps={{ musique: false }}
      />
      <Composition id="Video010" component={Video010} durationInFrames={TOTAL010} fps={60} width={1080} height={1920} />
      <Composition id="Video009" component={Video009} durationInFrames={TOTAL009} fps={30} width={1080} height={1920} />
      <Composition id="Video008Test" component={Video008} durationInFrames={TOTAL008} fps={30} width={1080} height={1920} />
    </>
  );
};
