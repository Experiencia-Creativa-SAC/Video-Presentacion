import { WORDMARK_PARTS } from "../../src/components/ui/Wordmark";
import { PIXELS } from "../videoConfig";

// Same seed, regular sampling, curved trajectories and quiet accent as IntroParticles.tsx.
// Sampling uses the official vector path and remains independent of the browser clock.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const { box, path } = WORDMARK_PARTS.mark;
const polygons = (path.match(/M[^M]+/g) ?? []).map((part) => {
  const n = (part.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  return Array.from({ length: n.length / 2 }, (_, i) => [
    n[i * 2],
    n[i * 2 + 1],
  ]);
});
function inside(x: number, y: number) {
  let hit = false;
  for (const polygon of polygons) {
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [ax, ay] = polygon[i];
      const [bx, by] = polygon[j];
      if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax)
        hit = !hit;
    }
  }
  return hit;
}
function buildParticles() {
  const random = mulberry32(PIXELS.seed);
  const step = Math.sqrt(
    ((box.maxX - box.minX) * (box.maxY - box.minY) * 0.38) / PIXELS.count,
  );
  const unit = 400 / (box.maxX - box.minX);
  const particles = [];
  for (let v = box.minY + step / 2; v < box.maxY; v += step) {
    for (let u = box.minX + step / 2; u < box.maxX; u += step) {
      if (!inside(u, v)) continue;
      const tx = 760 + (u - box.minX) * unit;
      const ty =
        252 + (344 - (box.maxY - box.minY) * unit) / 2 + (v - box.minY) * unit;
      const side = random(),
        beyond = 30 + random() * 140;
      let sx: number, sy: number;
      if (side < 0.38) [sx, sy] = [-beyond, random() * 1080];
      else if (side < 0.76) [sx, sy] = [1920 + beyond, random() * 1080];
      else if (side < 0.88) [sx, sy] = [random() * 1920, -beyond];
      else [sx, sy] = [random() * 1920, 1080 + beyond];
      const bend = 0.14 + random() * 0.2;
      particles.push({
        sx,
        sy,
        tx,
        ty,
        cx: (sx + tx) / 2 - (ty - sy) * bend,
        cy: (sy + ty) / 2 + (tx - sx) * bend,
        delay: random() * PIXELS.stagger,
        tone: Math.min(3, Math.floor(random() * 4)),
        accent: random() < 0.05,
      });
    }
  }
  return { particles, size: Math.max(1, step * unit * 0.78) };
}
const { particles, size } = buildParticles();

export const PixelX = ({
  assembly,
  opacity,
  reducedMotion = false,
}: {
  assembly: number;
  opacity: number;
  reducedMotion?: boolean;
}) => {
  const converge = Math.round(assembly * 1e6) / 1e6;
  opacity = Math.round(opacity * 1e6) / 1e6;
  if (opacity <= 0) return null;
  const batches = new Map<
    string,
    { d: string; color: string; alpha: number }
  >();
  for (const particle of particles) {
    const t = Math.min(
      1,
      Math.max(0, (converge - particle.delay) / (1 - PIXELS.stagger)),
    );
    if (t <= 0) continue;
    const e = 1 - Math.pow(1 - t, 3),
      k = 1 - e;
    const x = reducedMotion
      ? particle.tx
      : k * k * particle.sx + 2 * k * e * particle.cx + e * e * particle.tx;
    const y = reducedMotion
      ? particle.ty
      : k * k * particle.sy + 2 * k * e * particle.cy + e * e * particle.ty;
    const alpha = Math.ceil(Math.min(1, t * 5) * 4) / 4;
    const color = particle.accent
      ? "#d6e88a"
      : ["#a4a4a4", "#bdbdbd", "#dedede", "#ffffff"][particle.tone];
    const key = `${color}/${alpha}`;
    const batch = batches.get(key) ?? { d: "", color, alpha };
    batch.d += `M${(x - size / 2).toFixed(2)} ${(y - size / 2).toFixed(2)}h${size.toFixed(2)}v${size.toFixed(2)}h-${size.toFixed(2)}Z`;
    batches.set(key, batch);
  }
  return (
    <svg
      viewBox="0 0 1920 1080"
      width={1920}
      height={1080}
      aria-hidden
      style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}
    >
      {[...batches].map(([key, batch]) => (
        <path key={key} d={batch.d} fill={batch.color} opacity={batch.alpha} />
      ))}
    </svg>
  );
};
