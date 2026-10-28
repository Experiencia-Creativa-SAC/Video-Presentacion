import { WORDMARK_PARTS, Wordmark } from "../../src/components/ui/Wordmark";
import { COLORS } from "../videoConfig";
import { PixelX } from "./PixelX";

export const Brand = ({ width = 230 }: { width?: number }) => (
  <div style={{ width, color: COLORS.white }}>
    <Wordmark title="Xperiencia Creativa" />
  </div>
);

/** Official logo paths, shared by both sides of the loop seam. */
export const BrandStage = ({
  progress: amount,
  construction = 1,
  assembly = 1,
  reducedMotion = false,
}: {
  progress: number;
  construction?: number;
  assembly?: number;
  reducedMotion?: boolean;
}) => {
  amount = Math.round(amount * 1e6) / 1e6;
  construction = Math.round(construction * 1e6) / 1e6;
  const box = WORDMARK_PARTS.mark.box;
  const x = 760 - amount * 446;
  const y = 252 + amount * 50;
  return (
    <>
      <PixelX
        assembly={assembly}
        opacity={1 - construction}
        reducedMotion={reducedMotion}
      />
      <svg
        viewBox={`${box.minX} ${box.minY} ${box.maxX - box.minX} ${box.maxY - box.minY}`}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 400,
          height: 344,
          color: COLORS.white,
          overflow: "visible",
        }}
      >
        <path
          d={WORDMARK_PARTS.mark.path}
          fill="currentColor"
          fillRule="evenodd"
          opacity={construction}
        />
      </svg>
      <svg
        viewBox="0 0 1581 382"
        style={{
          position: "absolute",
          left: 314,
          top: 302,
          width: 1460,
          height: 353,
          color: COLORS.white,
          clipPath: `inset(0 ${(1 - amount) * 100}% 0 0)`,
        }}
      >
        <path
          d={WORDMARK_PARTS.word.path + WORDMARK_PARTS.tagline.path}
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </>
  );
};
