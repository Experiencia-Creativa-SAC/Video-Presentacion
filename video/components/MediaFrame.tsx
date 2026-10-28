import { useState } from "react";
import { Video } from "@remotion/media";
import { Img, staticFile, useCurrentFrame } from "remotion";
import type { MediaAsset } from "../assets";
import { COLORS, FPS, MOTION } from "../videoConfig";

export const MediaFrame = ({
  asset,
  width,
  height,
  x = 0,
  y = 0,
  fit = "cover",
  label = false,
  zoom = 1,
  reducedMotion = false,
}: {
  asset: MediaAsset;
  width: number;
  height: number;
  x?: number;
  y?: number;
  fit?: "contain" | "cover";
  label?: boolean;
  zoom?: number;
  reducedMotion?: boolean;
}) => {
  const frame = useCurrentFrame();
  const [failed, setFailed] = useState(false);
  const style = {
    width: "100%",
    height: "100%",
    objectFit: fit,
    objectPosition: asset.position ?? "center",
    transform: `scale(${zoom + (reducedMotion ? 0 : (frame / (FPS * 7)) * MOTION.drift)})`,
  } as const;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        overflow: "hidden",
        background: "#151719",
      }}
    >
      {asset.kind === "image" ? (
        <Img src={staticFile(asset.src)} style={style} />
      ) : failed && asset.poster ? (
        <Img src={staticFile(asset.poster)} style={style} />
      ) : (
        <Video
          src={staticFile(asset.src)}
          trimBefore={Math.round((asset.trim ?? 0) * FPS)}
          muted
          objectFit={fit}
          style={{
            width: style.width,
            height: style.height,
            transform: style.transform,
          }}
          onError={() => {
            if (!asset.poster) throw new Error(`Missing media: ${asset.src}`);
            setFailed(true);
            return "fallback";
          }}
        />
      )}
      {failed && (
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            fontSize: 20,
            background: COLORS.black,
            padding: 12,
          }}
        >
          RESPALDO ESTÁTICO · REEMPLAZAR VIDEO
        </div>
      )}
      {label && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "35px 26px 19px",
            background: "linear-gradient(transparent,rgba(0,0,0,.85))",
            fontSize: 18,
            letterSpacing: 1.4,
            color: COLORS.white,
          }}
        >
          {asset.label}
        </div>
      )}
    </div>
  );
};
export const VideoBackground = ({
  asset,
  reducedMotion = false,
}: {
  asset: MediaAsset;
  reducedMotion?: boolean;
}) => (
  <MediaFrame
    asset={asset}
    width={1920}
    height={1080}
    reducedMotion={reducedMotion}
  />
);
