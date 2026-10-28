import fs from "node:fs/promises";
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

const dir = "out/andesmin/qa";
const files = (await fs.readdir(dir))
  .filter((x) => /^frame-\d+\.png$/.test(x))
  .sort();
const heroFrames = new Set([
  0, 45, 110, 230, 410, 620, 850, 1060, 1200, 1260, 1360, 1450, 1490, 1570,
  1649,
]);
const heroFiles = files.filter((file) =>
  heroFrames.has(Number(file.match(/\d+/)[0])),
);
const columns = 3,
  tileWidth = 640,
  tileHeight = 396;
const tiles = await Promise.all(
  heroFiles.map(async (file, i) => {
    const label = Buffer.from(
      `<svg width="640" height="36"><rect width="640" height="36" fill="#222"/><text x="15" y="25" fill="white" font-size="20" font-family="Arial">${file}</text></svg>`,
    );
    return {
      input: await sharp(`${dir}/${file}`)
        .resize(640, 360)
        .extend({ bottom: 36, background: "#222" })
        .composite([{ input: label, top: 360, left: 0 }])
        .png()
        .toBuffer(),
      left: (i % columns) * tileWidth,
      top: Math.floor(i / columns) * tileHeight,
    };
  }),
);
await sharp({
  create: {
    width: columns * tileWidth,
    height: Math.ceil(heroFiles.length / columns) * tileHeight,
    channels: 3,
    background: "#222",
  },
})
  .composite(tiles)
  .jpeg({ quality: 92 })
  .toFile(`${dir}/storyboard.jpg`);
const boundaries = [150, 330, 540, 750, 960, 1170, 1380, 1530];
for (let group = 0; group < 2; group++) {
  const transitionFrames = boundaries
    .slice(group * 4, group * 4 + 4)
    .flatMap((frame) => [frame - 1, frame + 10, frame + 20]);
  const previews = await Promise.all(
    transitionFrames.map(async (frame, i) => ({
      input: await sharp(`${dir}/frame-${String(frame).padStart(4, "0")}.png`)
        .resize(640, 360)
        .extend({ bottom: 36, background: "#222" })
        .composite([
          {
            input: Buffer.from(
              `<svg width="640" height="36"><text x="15" y="25" fill="white" font-size="20" font-family="Arial">Frame ${frame}</text></svg>`,
            ),
            left: 0,
            top: 360,
          },
        ])
        .png()
        .toBuffer(),
      left: (i % 3) * 640,
      top: Math.floor(i / 3) * 396,
    })),
  );
  await sharp({
    create: { width: 1920, height: 1584, channels: 3, background: "#222" },
  })
    .composite(previews)
    .jpeg({ quality: 90 })
    .toFile(`${dir}/transitions-${group + 1}.jpg`);
}
const first = await sharp(`${dir}/frame-0000.png`)
  .removeAlpha()
  .raw()
  .toBuffer();
const last = await sharp(`${dir}/frame-1649.png`)
  .removeAlpha()
  .raw()
  .toBuffer();
let difference = 0;
for (let i = 0; i < first.length; i++)
  difference += Math.abs(first[i] - last[i]);
const outputs = [];
const finalCheck = process.argv.includes("--final");
for (const file of (await fs.readdir("out/andesmin")).filter((x) =>
  x.endsWith(".mp4"),
)) {
  const probe = JSON.parse(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_streams",
        "-show_format",
        "-of",
        "json",
        `out/andesmin/${file}`,
      ],
      { encoding: "utf8", windowsHide: true },
    ),
  );
  const video = probe.streams.find((x) => x.codec_type === "video");
  let encodedSeamMeanDifference = null;
  if (finalCheck) {
    // Decode the full stream, retaining only the seam frames for comparison.
    const pixels = execFileSync(
      "ffmpeg",
      [
        "-v",
        "error",
        "-xerror",
        "-i",
        `out/andesmin/${file}`,
        "-vf",
        `select='eq(n,0)+eq(n,${Number(video.nb_frames) - 1})',scale=960:540,format=rgb24`,
        "-fps_mode",
        "passthrough",
        "-an",
        "-f",
        "rawvideo",
        "-",
      ],
      { windowsHide: true, maxBuffer: 8 * 1024 * 1024 },
    );
    const frameSize = 960 * 540 * 3;
    assert.equal(pixels.length, frameSize * 2, `${file}: missing seam frames`);
    let sum = 0;
    for (let i = 0; i < frameSize; i++)
      sum += Math.abs(pixels[i] - pixels[frameSize + i]);
    encodedSeamMeanDifference = sum / frameSize;
    assert.ok(
      encodedSeamMeanDifference < 3,
      `${file}: encoded loop discontinuity`,
    );
  }
  outputs.push({
    file,
    width: video.width,
    height: video.height,
    codec: video.codec_name,
    pixelFormat: video.pix_fmt,
    colorSpace: video.color_space,
    colorRange: video.color_range,
    h264Level: video.level,
    fps: video.avg_frame_rate,
    frames: Number(video.nb_frames),
    duration: Number(probe.format.duration),
    bytes: Number(probe.format.size),
    audio: probe.streams.some((x) => x.codec_type === "audio"),
    decodedWithoutErrors: finalCheck,
    encodedSeamMeanDifference,
  });
}
if (finalCheck) {
  assert.equal(difference, 0, "Composition seam differs");
  for (const [suffix, width, height] of [
    ["4k", 3840, 2160],
    ["1080p", 1920, 1080],
    ["prueba", 960, 540],
  ]) {
    const output = outputs.find(
      (x) => x.file === `andesmin-xperiencia-creativa-${suffix}.mp4`,
    );
    assert.ok(output, `Missing ${suffix} render`);
    assert.equal(output.width, width);
    assert.equal(output.height, height);
    assert.equal(output.frames, 1650);
    assert.equal(output.duration, 55);
    assert.equal(output.fps, "30/1");
    assert.equal(output.codec, "h264");
    assert.equal(output.pixelFormat, "yuv420p");
    assert.equal(output.colorSpace, "bt709");
  }
  for (const mode of ["stills", "test", "1080p", "4k"])
    assert.deepEqual(
      JSON.parse(await fs.readFile(`${dir}/console-${mode}.json`, "utf8")),
      [],
      `Console errors in ${mode}`,
    );
}
const report = {
  finalChecksPassed: finalCheck,
  seamMeanAbsolutePixelDifference: difference / first.length,
  seamIdentical: difference === 0,
  reviewedFrames: files,
  outputs,
};
await fs.writeFile(
  `${dir}/quality-report.json`,
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
