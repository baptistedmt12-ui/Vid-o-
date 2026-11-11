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
import { Video022, TOTAL_FRAMES as F022 } from "./videos/022-omas-loeffel/Video022";
import { Video023, TOTAL_FRAMES as F023 } from "./videos/023-zerbrochene-schale/Video023";
import { Video024, TOTAL_FRAMES as F024 } from "./videos/024-tafel-kelle/Video024";
import { Video025, TOTAL_FRAMES as F025 } from "./videos/025-schwiegermutter/Video025";
import { Video026, TOTAL_FRAMES as F026 } from "./videos/026-drei-ringe/Video026";
import { Video027, TOTAL_FRAMES as F027 } from "./videos/027-holzmesser/Video027";
import { Video028, TOTAL_FRAMES as F028 } from "./videos/028-ki-wette/Video028";
import { Video029, TOTAL_FRAMES as F029 } from "./videos/029-antrag-loeffel/Video029";
import { Video030, TOTAL_FRAMES as F030 } from "./videos/030-hundeschale/Video030";
import { Video031, TOTAL_FRAMES as F031 } from "./videos/031-mobberin/Video031";
import { Video032, TOTAL_FRAMES as F032 } from "./videos/032-nachbar/Video032";
import { Video033, TOTAL_FRAMES as F033 } from "./videos/033-nordkap/Video033";
import { Video034, TOTAL_FRAMES as F034 } from "./videos/034-tablett/Video034";
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
      <Composition id="Video022" component={Video022} durationInFrames={F022} fps={30} width={1080} height={1920} />
      <Composition id="Video023" component={Video023} durationInFrames={F023} fps={30} width={1080} height={1920} />
      <Composition id="Video024" component={Video024} durationInFrames={F024} fps={30} width={1080} height={1920} />
      <Composition id="Video025" component={Video025} durationInFrames={F025} fps={30} width={1080} height={1920} />
      <Composition id="Video026" component={Video026} durationInFrames={F026} fps={30} width={1080} height={1920} />
      <Composition id="Video027" component={Video027} durationInFrames={F027} fps={30} width={1080} height={1920} />
      <Composition id="Video028" component={Video028} durationInFrames={F028} fps={30} width={1080} height={1920} />
      <Composition id="Video029" component={Video029} durationInFrames={F029} fps={30} width={1080} height={1920} />
      <Composition id="Video030" component={Video030} durationInFrames={F030} fps={30} width={1080} height={1920} />
      <Composition id="Video031" component={Video031} durationInFrames={F031} fps={30} width={1080} height={1920} />
      <Composition id="Video032" component={Video032} durationInFrames={F032} fps={30} width={1080} height={1920} />
      <Composition id="Video033" component={Video033} durationInFrames={F033} fps={30} width={1080} height={1920} />
      <Composition id="Video034" component={Video034} durationInFrames={F034} fps={30} width={1080} height={1920} />
    </>
  );
};
