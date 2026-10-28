import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { SceneChrome } from "../components/Graphics";
import { BEATS, COLORS, COPY, VideoProps } from "../videoConfig";

export const Scene08Manifesto = ({ reducedMotion }: VideoProps) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.white, color: COLORS.black }}>
      <SceneChrome number="08" title="DE PRINCIPIO A FIN" light />
      <div style={{ position: "absolute", left: 104, top: 257 }}>
        {COPY.manifesto.map((word, i) => (
          <div
            key={word}
            style={{
              marginBottom: 12,
              opacity:
                f > i * BEATS.manifesto.step + BEATS.manifesto.dimAfter && i < 2
                  ? 0.35
                  : 1,
            }}
          >
            <AnimatedTitle
              lines={[word]}
              start={i * BEATS.manifesto.step + BEATS.manifesto.start}
              size={143}
              color={COLORS.black}
              reducedMotion={reducedMotion}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 109,
          top: 879,
          width: 1705,
          height: 3,
          background: COLORS.black,
        }}
      />
    </AbsoluteFill>
  );
};
