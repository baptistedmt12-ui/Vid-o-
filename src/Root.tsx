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

import { Video007, TOTAL_FRAMES as F007 } from "./videos/007-bmw-pere-fils/Video007";
import { Video008, TOTAL_FRAMES as F008 } from "./videos/008-toit-vasistas/Video008";
import { Video009, TOTAL_FRAMES as F009 } from "./videos/009-portiere-acheteur/Video009";
import { Video010, TOTAL_FRAMES as F010 } from "./videos/010-location-460e/Video010";
import { Video011, TOTAL_FRAMES as F011 } from "./videos/011-drone-voisin/Video011";
import { Video012, TOTAL_FRAMES as F012 } from "./videos/012-bouchon-champagne/Video012";
import { Video013, TOTAL_FRAMES as F013 } from "./videos/013-lavage-moto/Video013";
import { Video014, TOTAL_FRAMES as F014 } from "./videos/014-mamie-enduro/Video014";
import { Video015, TOTAL_FRAMES as F015 } from "./videos/015-reservoir-jessica/Video015";
import { Video016, TOTAL_FRAMES as F016 } from "./videos/016-bosse-fesses/Video016";
import { Video017, TOTAL_FRAMES as F017 } from "./videos/017-noix-de-coco/Video017";
import { Video018, TOTAL_FRAMES as F018 } from "./videos/018-mamie-portail/Video018";
import { Video019, TOTAL_FRAMES as F019 } from "./videos/019-mec-dans-le-coffre/Video019";
import { Video020, TOTAL_FRAMES as F020 } from "./videos/020-remettre-la-bosse/Video020";
import { Video021, TOTAL_FRAMES as F021 } from "./videos/021-gamin-pousse/Video021";
import { Video006, FPS as FPS006, TOTAL_FRAMES as TOTAL006 } from "./videos/006-on-air-chambly/Video006";

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
      <Composition id="Video007" component={Video007} durationInFrames={F007} fps={30} width={1080} height={1920} />
      <Composition id="Video008" component={Video008} durationInFrames={F008} fps={30} width={1080} height={1920} />
      <Composition id="Video009" component={Video009} durationInFrames={F009} fps={30} width={1080} height={1920} />
      <Composition id="Video010" component={Video010} durationInFrames={F010} fps={30} width={1080} height={1920} />
      <Composition id="Video011" component={Video011} durationInFrames={F011} fps={30} width={1080} height={1920} />
      <Composition id="Video012" component={Video012} durationInFrames={F012} fps={30} width={1080} height={1920} />
      <Composition id="Video013" component={Video013} durationInFrames={F013} fps={30} width={1080} height={1920} />
      <Composition id="Video014" component={Video014} durationInFrames={F014} fps={30} width={1080} height={1920} />
      <Composition id="Video015" component={Video015} durationInFrames={F015} fps={30} width={1080} height={1920} />
      <Composition id="Video016" component={Video016} durationInFrames={F016} fps={30} width={1080} height={1920} />
      <Composition id="Video017" component={Video017} durationInFrames={F017} fps={30} width={1080} height={1920} />
      <Composition id="Video018" component={Video018} durationInFrames={F018} fps={30} width={1080} height={1920} />
      <Composition id="Video019" component={Video019} durationInFrames={F019} fps={30} width={1080} height={1920} />
      <Composition id="Video020" component={Video020} durationInFrames={F020} fps={30} width={1080} height={1920} />
      <Composition id="Video021" component={Video021} durationInFrames={F021} fps={30} width={1080} height={1920} />
    </>
  );
};
