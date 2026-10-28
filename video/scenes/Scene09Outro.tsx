import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { BrandStage } from "../components/Brand";
import {
  BEATS,
  COLORS,
  COPY,
  QR,
  PIXELS,
  SCENE_DURATION,
  VideoProps,
} from "../videoConfig";
import { move } from "../motion";

export const Scene09Outro = ({ reducedMotion }: VideoProps) => {
  const f = useCurrentFrame();
  const end = SCENE_DURATION[8] - 1;
  const close = move(f, end - BEATS.outro.close, BEATS.outro.lockupEnd);
  const construction =
    1 - move(f, BEATS.outro.solidStart, BEATS.outro.solidEnd);
  const assembly =
    1 - (1 - PIXELS.seamAssembly) * move(f, BEATS.outro.particleStart, end);
  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      <BrandStage
        progress={1 - close}
        construction={construction}
        assembly={assembly}
        reducedMotion={reducedMotion}
      />
      <div
        style={{
          position: "absolute",
          left: 720,
          top: 738,
          opacity: 1 - close,
          transform: `translateY(${reducedMotion ? 0 : close * 20}px)`,
        }}
      >
        <div style={{ fontSize: 31, fontWeight: 400 }}>{COPY.url}</div>
      </div>
      {QR.src && (
        <div
          style={{
            position: "absolute",
            right: 104,
            top: 744,
            width: 170,
            height: 170,
            padding: 12,
            background: "white",
            opacity: 1 - close,
          }}
        >
          <Img
            src={staticFile(QR.src)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
