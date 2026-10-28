import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ASSETS } from "../assets";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { MediaFrame } from "../components/MediaFrame";
import { SceneChrome, Subline } from "../components/Graphics";
import { BEATS, COLORS, COPY, VideoProps } from "../videoConfig";

export const Scene04ThreeD = ({ reducedMotion }: VideoProps) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.white, color: COLORS.black }}>
      <MediaFrame
        asset={f < BEATS.threeD.cut ? ASSETS.cgi : ASSETS.interior}
        x={0}
        y={0}
        width={1920}
        height={690}
        reducedMotion={reducedMotion}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(rgba(0,0,0,.62),transparent 24%,transparent 58%,rgba(0,0,0,.18) 70%,transparent 70%)",
        }}
      />
      <SceneChrome number="04" title="DISEÑO + VISUALIZACIÓN 3D" />
      <div style={{ position: "absolute", left: 104, top: 716 }}>
        <AnimatedTitle
          lines={COPY.threeD}
          size={80}
          color={COLORS.black}
          reducedMotion={reducedMotion}
        />
      </div>
      <div style={{ position: "absolute", left: 108, top: 925 }}>
        <Subline light>{COPY.threeDSub}</Subline>
      </div>
      <div
        style={{
          position: "absolute",
          right: 104,
          bottom: 57,
          fontSize: 19,
          color: COLORS.black,
          letterSpacing: 2,
        }}
      >
        TULIA · CRESA / SIENA
      </div>
    </AbsoluteFill>
  );
};
