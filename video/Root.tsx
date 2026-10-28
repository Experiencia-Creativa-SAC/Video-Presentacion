import { Composition } from "remotion";
import { AndesminVideo } from "./AndesminVideo";
import { DURATION, FPS, WIDTH, HEIGHT } from "./videoConfig";
import "./fonts.css";

export const RemotionRoot = () => (
  <>
    <Composition
      id="Andesmin4K"
      component={AndesminVideo}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={DURATION}
      defaultProps={{ reducedMotion: false }}
    />
    <Composition
      id="Andesmin1080p"
      component={AndesminVideo}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={DURATION}
      defaultProps={{ reducedMotion: false }}
    />
  </>
);
