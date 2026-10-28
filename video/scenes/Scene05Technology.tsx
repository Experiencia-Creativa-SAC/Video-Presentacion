import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ASSETS } from "../assets";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { MediaFrame } from "../components/MediaFrame";
import {
  AccentLine,
  GridOverlay,
  SceneChrome,
  Subline,
} from "../components/Graphics";
import { BEATS, COLORS, COPY, VideoProps } from "../videoConfig";
import { progress } from "../motion";

export const Scene05Technology = ({ reducedMotion }: VideoProps) => {
  const f = useCurrentFrame();
  const p = progress(f, BEATS.technology.start, BEATS.technology.reveal);
  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      <GridOverlay />
      <SceneChrome number="05" title="DESARROLLO TECNOLÓGICO" />
      <div
        style={{
          position: "absolute",
          left: 672,
          top: 182,
          width: 1144,
          height: 646,
          overflow: "hidden",
          transform: `perspective(1800px) rotateY(${reducedMotion ? 0 : (1 - p) * -9}deg) translateX(${reducedMotion ? 0 : (1 - p) * 180}px)`,
          transformOrigin: "right center",
        }}
      >
        <MediaFrame
          asset={ASSETS.web}
          width={1144}
          height={646}
          zoom={1.02}
          reducedMotion={reducedMotion}
        />
        <div
          style={{ position: "absolute", inset: 0, border: "1px solid #5559" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 104,
          top: 367,
          textShadow: "0 2px 25px #08090a",
        }}
      >
        <AnimatedTitle
          lines={COPY.technology}
          size={94}
          accentLast
          reducedMotion={reducedMotion}
        />
      </div>
      <div style={{ position: "absolute", left: 108, top: 762 }}>
        <AccentLine />
        <div style={{ height: 28 }} />
        <Subline>
          SOFTWARE · WEB · APPS
          <br />
          SISTEMAS INTERACTIVOS
        </Subline>
      </div>
      <div
        style={{
          position: "absolute",
          right: 104,
          top: 862,
          fontSize: 22,
          color: COLORS.gray,
          letterSpacing: 1,
        }}
      >
        TULIA · CRESA / PLATAFORMA INTERACTIVA
      </div>
    </AbsoluteFill>
  );
};
