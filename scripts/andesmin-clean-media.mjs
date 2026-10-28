import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";

// Derived copies for this film only. The website's original project media stays intact.
const clips = [
  { slug: "intech-realidad-mixta", file: "video-1", filter: "crop=iw:616:0:0" },
  { slug: "intech-realidad-mixta", file: "video-2", filter: "crop=iw:608:0:0" },
  {
    slug: "flanders-realidad-mixta",
    file: "video-1",
    filter: "crop=iw:630:0:0",
  },
  {
    slug: "flanders-realidad-mixta",
    file: "video-2",
    filter: "drawbox=x=824:y=636:w=126:h=60:color=black:t=fill",
  },
  {
    slug: "siena-realidad-virtual",
    file: "video-1",
    filter: "crop=iw:640:0:0",
  },
  {
    slug: "festi-feria-realidad-virtual",
    file: "video-1",
    filter: "crop=iw:640:0:0",
  },
];
const dir = "public/andesmin/video";
await fs.mkdir(dir, { recursive: true });
for (const clip of clips) {
  const name = `${clip.slug}-${clip.file}`;
  execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-y",
      "-i",
      `public/proyectos/${clip.slug}/${clip.file}.mp4`,
      "-vf",
      clip.filter,
      "-an",
      "-c:v",
      "libx264",
      "-crf",
      "16",
      "-preset",
      "medium",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      `${dir}/${name}.mp4`,
    ],
    { windowsHide: true },
  );
  execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-y",
      "-i",
      `${dir}/${name}.mp4`,
      "-frames:v",
      "1",
      `${dir}/${name}.webp`,
    ],
    { windowsHide: true },
  );
  console.log(`Cleaned ${name}`);
}
await fs.writeFile(`${dir}/provenance.json`, JSON.stringify(clips, null, 2));
