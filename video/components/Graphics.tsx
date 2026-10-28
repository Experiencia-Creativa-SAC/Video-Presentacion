import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, MOTION } from "../videoConfig";
import { progress, move } from "../motion";
import { Brand } from "./Brand";

export const AccentLine = ({
  width = 150,
  start = 0,
}: {
  width?: number;
  start?: number;
}) => {
  const p = progress(useCurrentFrame(), start);
  return (
    <div
      style={{
        width,
        height: 3,
        background: COLORS.lime,
        transform: `scaleX(${p})`,
        transformOrigin: "left",
      }}
    />
  );
};
export const GridOverlay = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      opacity: 0.16,
      backgroundImage:
        "linear-gradient(#666 1px, transparent 1px),linear-gradient(90deg,#666 1px,transparent 1px)",
      backgroundSize: "240px 240px",
      maskImage: "linear-gradient(90deg,black,transparent 70%)",
    }}
  />
);
export const SectionLabel = ({
  number,
  title,
  dark = false,
}: {
  number: string;
  title: string;
  dark?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      gap: 22,
      alignItems: "center",
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: 2,
      color: dark ? COLORS.black : COLORS.white,
    }}
  >
    <span
      style={{
        width: 9,
        height: 9,
        background: dark ? COLORS.black : COLORS.lime,
      }}
    />
    <span>{number}</span>
    <span style={{ opacity: 0.65 }}>/</span>
    <span>{title}</span>
  </div>
);
export const SceneChrome = ({
  number,
  title,
  light = false,
}: {
  number: string;
  title: string;
  light?: boolean;
}) => (
  <>
    <div style={{ position: "absolute", left: 104, top: 68 }}>
      <SectionLabel number={number} title={title} dark={light} />
    </div>
    {!light && (
      <div style={{ position: "absolute", right: 104, top: 62 }}>
        <Brand width={222} />
      </div>
    )}
    <div
      style={{
        position: "absolute",
        left: 104,
        right: 104,
        bottom: 57,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 19,
        letterSpacing: 2,
        color: light ? COLORS.black : COLORS.gray,
      }}
    >
      <span>XPERIENCIA CREATIVA</span>
    </div>
  </>
);
export const Subline = ({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) => (
  <div
    style={{
      fontSize: 25,
      lineHeight: 1.65,
      letterSpacing: 0.7,
      fontWeight: 400,
      color: light ? COLORS.black : COLORS.white,
    }}
  >
    {children}
  </div>
);
export const TransitionMask = ({
  children,
  first = false,
  reducedMotion = false,
}: {
  children: ReactNode;
  first?: boolean;
  reducedMotion?: boolean;
}) => {
  const frame = useCurrentFrame();
  const p = first ? 1 : move(frame, 0, MOTION.transition);
  return (
    <AbsoluteFill
      style={{
        clipPath: reducedMotion
          ? undefined
          : `polygon(0 0,${p * 112}% 0,${p * 112 - 12}% 100%,0 100%)`,
        opacity: reducedMotion ? p : 1,
        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
