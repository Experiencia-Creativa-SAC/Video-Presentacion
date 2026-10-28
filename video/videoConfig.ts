import { Easing } from "remotion";

export const FPS = 30;
export const WIDTH = 3840;
export const HEIGHT = 2160;
export const DESIGN = { width: 1920, height: 1080, safe: 104 } as const;
export const COLORS = {
  black: "#08090a",
  white: "#f5f5f1",
  gray: "#999d9f",
  line: "#333638",
  lime: "#b7ff2a",
} as const;
export const SCENE_SECONDS = [5, 6, 7, 7, 7, 7, 7, 5, 4] as const;
export const SCENE_DURATION = SCENE_SECONDS.map((s) => s * FPS);
export const SCENE_START = SCENE_DURATION.map((_, i) =>
  SCENE_DURATION.slice(0, i).reduce((a, b) => a + b, 0),
);
export const DURATION = SCENE_DURATION.reduce((a, b) => a + b, 0);
export const MOTION = {
  reveal: 24,
  stagger: 5,
  transition: 20,
  drift: 0.035,
  exit: 18,
  hold: 12,
} as const;
export const BEATS = {
  intro: {
    start: 60,
    lockupEnd: 90,
    subtitle: 83,
    construction: 60,
    particleEnd: 46,
    solidStart: 46,
    solidDuration: 14,
  },
  capabilities: { cut: 90 },
  vr: { cut: 108 },
  threeD: { cut: 108 },
  technology: { start: 4, reveal: 40 },
  experience: { cut: 102 },
  montage: { cuts: [0, 36, 68, 100, 132, 164], ideaToReal: 100 },
  manifesto: { step: 36, start: 8, dimAfter: 32 },
  outro: {
    close: 69,
    lockupEnd: 90,
    solidStart: 90,
    solidEnd: 102,
    particleStart: 90,
  },
} as const;
export const PIXELS = {
  count: 1700,
  seed: 20261004,
  stagger: 0.38,
  // Binary-exact endpoint: both sides of the cyclic subtraction resolve identically.
  seamAssembly: 0.125,
} as const;
export const EASE = {
  out: Easing.bezier(0.23, 1, 0.32, 1),
  move: Easing.bezier(0.77, 0, 0.175, 1),
};
export const COPY = {
  intro: "DISEÑO · TECNOLOGÍA · EXPERIENCIAS",
  capabilities: [
    "CREAMOS SOLUCIONES",
    "DIGITALES, VISUALES",
    "E INTERACTIVAS.",
  ],
  vr: ["REALIDAD VIRTUAL", "Y SIMULACIÓN"],
  vrSub: "CAPACITACIÓN · VISUALIZACIÓN · EXPERIENCIAS INMERSIVAS",
  threeD: ["DISEÑO Y", "VISUALIZACIÓN 3D"],
  threeDSub: "CGI · ANIMACIÓN · ENTORNOS · CONTENIDO VISUAL",
  technology: ["DESARROLLO", "TECNOLÓGICO"],
  technologySub: "SOFTWARE · WEB · APPS · SISTEMAS INTERACTIVOS",
  experience: ["TECNOLOGÍA QUE", "SE CONVIERTE", "EN EXPERIENCIA"],
  experienceSub: "INTEGRACIÓN · EQUIPAMIENTO · IMPLEMENTACIÓN",
  manifesto: ["DISEÑAMOS.", "DESARROLLAMOS.", "IMPLEMENTAMOS."],
  url: "xperienciacreativa.com",
} as const;
export const QR = {
  src: null as string | null,
  url: "https://xperienciacreativa.com/info",
};
export const OPTIONAL_AUDIO = { src: null as string | null, volume: 0.12 };
export type VideoProps = { reducedMotion: boolean };
