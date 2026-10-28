import path from "node:path";
import fs from "node:fs/promises";
import { bundle } from "@remotion/bundler";
import {
  selectComposition,
  renderMedia,
  renderStill,
} from "@remotion/renderer";

const mode = process.argv[2] ?? "test";
if (!["test", "1080p", "4k", "stills"].includes(mode))
  throw new Error(`Unknown render mode: ${mode}`);
const qa = path.resolve("out/andesmin/qa");
await fs.mkdir(qa, { recursive: true });
const serveUrl = await bundle({
  // Separate renders may run together without racing on Webpack's shared disk cache.
  enableCaching: false,
  entryPoint: path.resolve("video/index.ts"),
  publicDir: path.resolve("public"),
  outDir: path.resolve(`out/andesmin/bundle-${mode}`),
});
const inputProps = { reducedMotion: false };
const composition = await selectComposition({
  serveUrl,
  id: mode === "4k" ? "Andesmin4K" : "Andesmin1080p",
  inputProps,
});
const errors = [];
const onBrowserLog = (log) => {
  if (log.type === "error") {
    errors.push(log.text);
    console.error(log.text);
  }
};
if (mode === "stills") {
  const heroFrames = [
    0, 24, 45, 60, 82, 110, 230, 410, 620, 850, 1060, 1200, 1260, 1360, 1450,
    1490, 1570, 1600, 1620, 1635, 1649,
  ];
  const boundaries = [150, 330, 540, 750, 960, 1170, 1380, 1530];
  const frames = [
    ...new Set([
      ...heroFrames,
      ...boundaries.flatMap((frame) => [frame - 1, frame + 10, frame + 20]),
    ]),
  ].sort((a, b) => a - b);
  for (const frame of frames) {
    await renderStill({
      serveUrl,
      composition,
      inputProps,
      frame,
      output: path.join(qa, `frame-${String(frame).padStart(4, "0")}.png`),
      imageFormat: "png",
      scale: 0.5,
      onBrowserLog,
    });
    console.log(`Reviewed still ${frame}`);
  }
} else {
  const names = {
    test: "andesmin-xperiencia-creativa-prueba.mp4",
    "1080p": "andesmin-xperiencia-creativa-1080p.mp4",
    "4k": "andesmin-xperiencia-creativa-4k.mp4",
  };
  const outputLocation = path.resolve("out/andesmin", names[mode]);
  let reported = -1;
  await renderMedia({
    serveUrl,
    composition,
    inputProps,
    outputLocation,
    codec: "h264",
    pixelFormat: "yuv420p",
    colorSpace: "bt709",
    crf: mode === "test" ? 23 : 17,
    x264Preset: mode === "test" ? "veryfast" : "medium",
    scale: mode === "test" ? 0.5 : 1,
    concurrency: mode === "4k" ? 3 : 4,
    imageFormat: mode === "test" ? "jpeg" : "png",
    jpegQuality: mode === "test" ? 95 : undefined,
    onBrowserLog,
    onProgress: ({ progress }) => {
      const percent = Math.floor(progress * 10) * 10;
      if (percent !== reported) {
        reported = percent;
        console.log(`${mode}: ${percent}%`);
      }
    },
  });
  console.log(outputLocation);
}
await fs.writeFile(
  path.join(qa, `console-${mode}.json`),
  JSON.stringify(errors, null, 2),
);
if (errors.length) throw new Error(`Browser errors: ${errors.length}`);
