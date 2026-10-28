import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useVideoConfig,
  useCurrentFrame,
} from "remotion";
import { TransitionMask } from "./components/Graphics";
import { PixelX } from "./components/PixelX";
import { Scene01Intro } from "./scenes/Scene01Intro";
import { Scene02Capabilities } from "./scenes/Scene02Capabilities";
import { Scene03VR } from "./scenes/Scene03VR";
import { Scene04ThreeD } from "./scenes/Scene04ThreeD";
import { Scene05Technology } from "./scenes/Scene05Technology";
import { Scene06Experience } from "./scenes/Scene06Experience";
import { Scene07Montage } from "./scenes/Scene07Montage";
import { Scene08Manifesto } from "./scenes/Scene08Manifesto";
import { Scene09Outro } from "./scenes/Scene09Outro";
import {
  COLORS,
  DESIGN,
  DURATION,
  PIXELS,
  MOTION,
  OPTIONAL_AUDIO,
  SCENE_DURATION,
  SCENE_START,
  VideoProps,
} from "./videoConfig";

const scenes = [
  Scene01Intro,
  Scene02Capabilities,
  Scene03VR,
  Scene04ThreeD,
  Scene05Technology,
  Scene06Experience,
  Scene07Montage,
  Scene08Manifesto,
  Scene09Outro,
];
export const AndesminVideo = ({ reducedMotion }: VideoProps) => {
  const { width } = useVideoConfig();
  const frame = useCurrentFrame();
  const seam = frame === 0 || frame === DURATION - 1;
  return (
    <AbsoluteFill
      style={{
        background: COLORS.black,
        color: COLORS.white,
        fontFamily: "Poppins",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: DESIGN.width,
          height: DESIGN.height,
          transform: `scale(${width / DESIGN.width})`,
          transformOrigin: "top left",
        }}
      >
        {/* One identical DOM tree at both seam frames also fixes subpixel alpha
            rounding from the different scene compositing layers. */}
        {seam ? (
          <PixelX
            assembly={PIXELS.seamAssembly}
            opacity={1}
            reducedMotion={reducedMotion}
          />
        ) : (
          scenes.map((Scene, i) => (
            <Sequence
              key={i}
              from={SCENE_START[i]}
              durationInFrames={
                SCENE_DURATION[i] +
                (i < scenes.length - 1 ? MOTION.transition : 0)
              }
              name={`0${i + 1} · ${Scene.name}`}
            >
              <TransitionMask first={i === 0} reducedMotion={reducedMotion}>
                <Scene reducedMotion={reducedMotion} />
              </TransitionMask>
            </Sequence>
          ))
        )}
      </div>
      {OPTIONAL_AUDIO.src && (
        <Audio
          src={staticFile(OPTIONAL_AUDIO.src)}
          volume={OPTIONAL_AUDIO.volume}
        />
      )}
    </AbsoluteFill>
  );
};
