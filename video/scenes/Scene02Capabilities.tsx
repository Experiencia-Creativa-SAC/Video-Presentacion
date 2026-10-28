import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ASSETS } from "../assets";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { MediaFrame } from "../components/MediaFrame";
import { AccentLine, SceneChrome } from "../components/Graphics";
import { BEATS, COLORS, COPY, VideoProps } from "../videoConfig";

export const Scene02Capabilities = ({ reducedMotion }: VideoProps) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      <MediaFrame
        asset={f < BEATS.capabilities.cut ? ASSETS.vr : ASSETS.operator}
        x={1090}
        y={0}
        width={830}
        height={640}
        reducedMotion={reducedMotion}
      />
      <MediaFrame
        asset={ASSETS.cgi}
        x={1090}
        y={654}
        width={410}
        height={426}
        reducedMotion={reducedMotion}
      />
      <MediaFrame
        asset={ASSETS.web}
        x={1514}
        y={654}
        width={406}
        height={426}
        reducedMotion={reducedMotion}
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(90deg,#08090a 49%,transparent 76%)",
        }}
      />
      <SceneChrome number="02" title="CAPACIDADES" />
      <div style={{ position: "absolute", left: 104, top: 333 }}>
        <AccentLine />
        <div style={{ height: 40 }} />
        <AnimatedTitle
          lines={COPY.capabilities}
          size={91}
          accentLast
          reducedMotion={reducedMotion}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 108,
          top: 800,
          fontSize: 25,
          color: COLORS.gray,
        }}
      >
        VR / CGI / 3D / SOFTWARE / INTERACCIÓN
      </div>
    </AbsoluteFill>
  );
};
