import { AbsoluteFill, Sequence } from "remotion";
import { ASSETS } from "../assets";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { MediaFrame } from "../components/MediaFrame";
import { AccentLine, SceneChrome, Subline } from "../components/Graphics";
import { BEATS, COLORS, COPY, VideoProps } from "../videoConfig";

export const Scene06Experience = ({ reducedMotion }: VideoProps) => (
  <AbsoluteFill style={{ background: COLORS.black }}>
    <MediaFrame
      asset={ASSETS.person}
      x={1110}
      y={185}
      width={345}
      height={663}
      fit="contain"
      reducedMotion={reducedMotion}
    />
    <MediaFrame
      asset={ASSETS.ar}
      x={1475}
      y={185}
      width={341}
      height={663}
      reducedMotion={reducedMotion}
    />
    <Sequence from={BEATS.experience.cut}>
      <MediaFrame
        asset={ASSETS.operator}
        x={1030}
        y={185}
        width={786}
        height={663}
        reducedMotion={reducedMotion}
      />
    </Sequence>
    <AbsoluteFill
      style={{
        background: "linear-gradient(90deg,#08090a 40%,transparent 70%)",
      }}
    />
    <SceneChrome number="06" title="INTEGRACIÓN + EXPERIENCIAS" />
    <div style={{ position: "absolute", left: 104, top: 300 }}>
      <AccentLine />
      <div style={{ height: 38 }} />
      <AnimatedTitle
        lines={COPY.experience}
        size={84}
        accentLast
        reducedMotion={reducedMotion}
      />
    </div>
    <div style={{ position: "absolute", left: 108, top: 807 }}>
      <Subline>
        INTEGRACIÓN · EQUIPAMIENTO
        <br />
        IMPLEMENTACIÓN
      </Subline>
    </div>
  </AbsoluteFill>
);
