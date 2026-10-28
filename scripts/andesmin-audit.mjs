import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const output = "out/andesmin/qa";
await fs.mkdir(output, { recursive: true });
const walk = async (dir) =>
  (
    await Promise.all(
      (await fs.readdir(dir, { withFileTypes: true })).map(async (e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
const files = (await walk("public")).filter((p) =>
  /\.(mp4|webp|avif|png|jpg|jpeg|svg)$/i.test(p),
);
const inventory = [];
const tiles = [];
for (const file of files) {
  if (/\.mp4$/i.test(file)) {
    const probe = JSON.parse(
      execFileSync(
        "ffprobe",
        ["-v", "error", "-show_streams", "-show_format", "-of", "json", file],
        { encoding: "utf8", windowsHide: true },
      ),
    );
    const stream = probe.streams.find((s) => s.codec_type === "video");
    inventory.push({
      file,
      type: "video",
      width: stream.width,
      height: stream.height,
      fps: stream.avg_frame_rate,
      duration: Number(probe.format.duration),
      native4k: stream.width >= 3840 && stream.height >= 2160,
    });
    for (const sec of [1, 5]) {
      const frame = execFileSync(
        "ffmpeg",
        [
          "-v",
          "error",
          "-ss",
          String(sec),
          "-i",
          file,
          "-frames:v",
          "1",
          "-f",
          "image2pipe",
          "-vcodec",
          "mjpeg",
          "-",
        ],
        { maxBuffer: 15 * 1024 * 1024, windowsHide: true },
      );
      const label =
        `${file.replace("public\\proyectos\\", "")} @${sec}s`.replaceAll(
          "&",
          "&amp;",
        );
      const svg = Buffer.from(
        `<svg width="480" height="46"><rect width="480" height="46" fill="#111"/><text x="12" y="19" fill="white" font-size="12" font-family="Arial">${label}</text></svg>`,
      );
      tiles.push(
        await sharp({
          create: { width: 480, height: 316, channels: 3, background: "#111" },
        })
          .composite([
            {
              input: await sharp(frame)
                .resize(480, 270, { fit: "contain", background: "#111" })
                .toBuffer(),
              top: 0,
              left: 0,
            },
            { input: svg, top: 270, left: 0 },
          ])
          .png()
          .toBuffer(),
      );
    }
  } else {
    const m = await sharp(file)
      .metadata()
      .catch(() => null);
    if (m)
      inventory.push({
        file,
        type: "image",
        width: m.width,
        height: m.height,
        native4k: m.width >= 3840 && m.height >= 2160,
      });
  }
}
await fs.writeFile(
  `${output}/asset-inventory.json`,
  JSON.stringify(inventory, null, 2),
);
const cols = 4;
await sharp({
  create: {
    width: cols * 480,
    height: Math.ceil(tiles.length / cols) * 316,
    channels: 3,
    background: "#222",
  },
})
  .composite(
    tiles.map((input, i) => ({
      input,
      left: (i % cols) * 480,
      top: Math.floor(i / cols) * 316,
    })),
  )
  .jpeg({ quality: 85 })
  .toFile(`${output}/source-contact-sheet.jpg`);
console.log(
  JSON.stringify(
    {
      assets: inventory.length,
      videos: inventory.filter((x) => x.type === "video").length,
      native4k: inventory.filter((x) => x.native4k),
      sheet: `${output}/source-contact-sheet.jpg`,
    },
    null,
    2,
  ),
);
