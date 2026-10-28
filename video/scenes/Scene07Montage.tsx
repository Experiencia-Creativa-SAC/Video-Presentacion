import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { ASSETS } from "../assets";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { VideoBackground } from "../components/MediaFrame";
import { SceneChrome } from "../components/Graphics";
import {
  BEATS,
  COLORS,
  MOTION,
  SCENE_DURATION,
  VideoProps,
} from "../videoConfig";

const shots = [
  ASSETS.vr,
  ASSETS.cgi,
  ASSETS.web,
  ASSETS.interior,
  ASSETS.operator,
  ASSETS.realtime,
];
export const MONTAGE = BEATS.montage.cuts.map((from, i) => ({
  from,
  duration:
    (BEATS.montage.cuts[i + 1] ?? SCENE_DURATION[6] + MOTION.transition) - from,
  asset: shots[i],
}));
export const Scene07Montage = ({ reducedMotion }: VideoProps) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      {MONTAGE.map((shot) => (
        <Sequence
          key={shot.from}
          from={shot.from}
          durationInFrames={shot.duration}
        >
          <VideoBackground asset={shot.asset} reducedMotion={reducedMotion} />
        </Sequence>
      ))}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg,rgba(0,0,0,.76),rgba(0,0,0,.16) 70%,rgba(0,0,0,.55))",
        }}
      />
      <SceneChrome number="07" title="DE LA IDEA A LA REALIDAD" />
      <div
        style={{
          position: "absolute",
          left: 104,
          top: f < BEATS.montage.ideaToReal ? 650 : 552,
        }}
      >
        {f < BEATS.montage.ideaToReal ? (
          <AnimatedTitle
            lines={["DE UNA IDEA"]}
            size={150}
            start={3}
            reducedMotion={reducedMotion}
          />
        ) : (
          <Sequence from={BEATS.montage.ideaToReal} layout="none">
            <AnimatedTitle
              lines={["A UNA", "EXPERIENCIA."]}
              size={132}
              start={0}
              reducedMotion={reducedMotion}
            />
          </Sequence>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 106,
          top: 908,
          width: 1708,
          height: 3,
          background: "#ffffff33",
        }}
      >
        <div
          style={{
            height: 3,
            background: COLORS.lime,
            transform: `scaleX(${Math.min(1, f / (SCENE_DURATION[6] - 1))})`,
            transformOrigin: "left",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
