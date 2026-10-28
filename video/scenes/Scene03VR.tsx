import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ASSETS } from "../assets";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { MediaFrame } from "../components/MediaFrame";
import { AccentLine, SceneChrome, Subline } from "../components/Graphics";
import { BEATS, COLORS, VideoProps } from "../videoConfig";

export const Scene03VR = ({ reducedMotion }: VideoProps) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      <SceneChrome number="03" title="REALIDAD VIRTUAL + SIMULACIÓN" />
      <MediaFrame
        asset={f < BEATS.vr.cut ? ASSETS.industrial : ASSETS.machinery}
        x={720}
        y={193}
        width={1096}
        height={618}
        label
        reducedMotion={reducedMotion}
      />
      <MediaFrame
        asset={ASSETS.operator}
        x={104}
        y={660}
        width={585}
        height={260}
        label
        reducedMotion={reducedMotion}
      />
      <div style={{ position: "absolute", left: 104, top: 229 }}>
        <AccentLine />
        <div style={{ height: 36 }} />
        <AnimatedTitle
          lines={["REALIDAD", "VIRTUAL", "Y SIMULACIÓN"]}
          size={77}
          accentLast
          reducedMotion={reducedMotion}
        />
      </div>
      <div style={{ position: "absolute", left: 750, top: 843 }}>
        <Subline>
          CAPACITACIÓN · VISUALIZACIÓN
          <br />
          EXPERIENCIAS INMERSIVAS
        </Subline>
      </div>
    </AbsoluteFill>
  );
};
