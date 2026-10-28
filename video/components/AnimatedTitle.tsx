import { useCurrentFrame } from "remotion";
import { COLORS, MOTION } from "../videoConfig";
import { progress } from "../motion";

export const AnimatedTitle = ({
  lines,
  size = 92,
  start = 8,
  color = COLORS.white,
  accentLast = false,
  reducedMotion = false,
}: {
  lines: readonly string[];
  size?: number;
  start?: number;
  color?: string;
  accentLast?: boolean;
  reducedMotion?: boolean;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 600,
        lineHeight: 1.11,
        letterSpacing: -size * 0.045,
        color,
      }}
    >
      {lines.map((line, i) => {
        const p = progress(frame, start + i * MOTION.stagger);
        return (
          <div key={line} style={{ overflow: "hidden", paddingBottom: 8 }}>
            <div
              style={{
                whiteSpace: "nowrap",
                transform: `translateY(${reducedMotion ? 0 : (1 - p) * 112}%)`,
                opacity: reducedMotion ? p : 1,
                color:
                  accentLast && i === lines.length - 1 ? COLORS.lime : color,
              }}
            >
              {line}
            </div>
          </div>
        );
      })}
    </div>
  );
};
