import "./fonts";
import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Video001 } from "./videos/001-video-001/Video001";
import { FPS, TOTAL_FRAMES } from "./videos/001-video-001/timeline";
import { Video002 } from "./videos/002-etiquette-arrachee/Video002";
import * as T002 from "./videos/002-etiquette-arrachee/timeline";

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
    </>
  );
};
