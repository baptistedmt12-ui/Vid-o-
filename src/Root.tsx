import "./fonts";
import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";

import { Video009, TOTAL_FRAMES as F009 } from "./videos/009-jet-c/Video009";
import { Video010, TOTAL_FRAMES as F010 } from "./videos/010-jet-d/Video010";

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
      <Composition id="Video009" component={Video009} durationInFrames={F009} fps={30} width={1080} height={1920} />
      <Composition id="Video010" component={Video010} durationInFrames={F010} fps={30} width={1080} height={1920} />
    </>
  );
};
