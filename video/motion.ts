import { interpolate } from "remotion";
import { EASE, MOTION } from "./videoConfig";
export const progress = (
  frame: number,
  start = 0,
  duration: number = MOTION.reveal,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.out,
  });
export const move = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.move,
  });
