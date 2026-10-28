import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BrandStage } from "../components/Brand";
import { AccentLine, SceneChrome } from "../components/Graphics";
import { BEATS, COLORS, COPY, PIXELS, VideoProps } from "../videoConfig";
import { progress, move } from "../motion";

export const Scene01Intro = ({ reducedMotion }: VideoProps) => {
  const f = useCurrentFrame();
  const p = move(f, BEATS.intro.start, BEATS.intro.lockupEnd);
  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      <div style={{ opacity: progress(f, BEATS.intro.start) }}>
        <SceneChrome number="01" title="DISEÑO + TECNOLOGÍA" />
      </div>
      <BrandStage
        progress={p}
        construction={progress(
          f,
          BEATS.intro.solidStart,
          BEATS.intro.solidDuration,
        )}
        assembly={
          PIXELS.seamAssembly +
          (1 - PIXELS.seamAssembly) * move(f, 0, BEATS.intro.particleEnd)
        }
        reducedMotion={reducedMotion}
      />
      <div
        style={{
          position: "absolute",
          left: 720,
          top: 728,
          clipPath: `inset(0 ${(1 - progress(f, BEATS.intro.subtitle)) * 100}% 0 0)`,
          transform: `translateY(${reducedMotion ? 0 : (1 - progress(f, BEATS.intro.subtitle)) * 24}px)`,
        }}
      >
        <AccentLine />
        <div style={{ fontSize: 27, letterSpacing: 2.3, marginTop: 25 }}>
          {COPY.intro}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 314,
          top: 265,
          width: 400,
          height: 2,
          background: COLORS.lime,
          transform: `scaleX(${Math.sin(Math.PI * progress(f, 0, BEATS.intro.construction))})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
