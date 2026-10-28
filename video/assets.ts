/** Original media plus explicitly prepared copies without the legacy Futura credit. */
export type MediaAsset = {
  src: string;
  poster?: string;
  kind: "video" | "image";
  label: string;
  trim?: number;
  position?: string;
};
const clip = (
  slug: string,
  file: string,
  label: string,
  trim = 0,
): MediaAsset => ({
  src: `proyectos/${slug}/${file}.mp4`,
  poster: `proyectos/${slug}/${file.replace("video-", "poster-")}${file.startsWith("video-") ? "" : "-poster"}.webp`,
  kind: "video",
  label,
  trim,
});
const cleanClip = (
  slug: string,
  file: string,
  label: string,
  trim = 0,
): MediaAsset => ({
  ...clip(slug, file, label, trim),
  src: `andesmin/video/${slug}-${file}.mp4`,
  poster: `andesmin/video/${slug}-${file}.webp`,
});
export const ASSETS = {
  industrial: cleanClip(
    "intech-realidad-mixta",
    "video-2",
    "INTECH · REALIDAD MIXTA",
    0.4,
  ),
  machinery: cleanClip(
    "intech-realidad-mixta",
    "video-1",
    "INTECH · VISUALIZACIÓN INDUSTRIAL",
    0.2,
  ),
  operator: cleanClip(
    "flanders-realidad-mixta",
    "video-2",
    "FLANDERS · INTERACCIÓN INMERSIVA",
    0.3,
  ),
  simulator: cleanClip(
    "flanders-realidad-mixta",
    "video-1",
    "FLANDERS · ENTORNO VIRTUAL",
    0.6,
  ),
  vr: cleanClip(
    "siena-realidad-virtual",
    "video-1",
    "SIENA · REALIDAD VIRTUAL",
    0.15,
  ),
  interior: clip(
    "siena-realidad-virtual",
    "video-2",
    "SIENA · VISUALIZACIÓN 3D",
    0.3,
  ),
  cgi: clip("tulia-cresa", "presentacion", "TULIA · CRESA / CGI", 2),
  web: clip(
    "tulia-cresa",
    "web-interactivo",
    "TULIA · CRESA / WEB INTERACTIVA",
    12,
  ),
  realtime: clip(
    "real-estate-hub-interactivo",
    "video-2",
    "REAL ESTATE HUB · TIEMPO REAL",
    0.3,
  ),
  ar: clip(
    "festi-feria-realidad-aumentada",
    "video-3",
    "FESTI FERIA · REALIDAD AUMENTADA",
    0.3,
  ),
  person: cleanClip(
    "festi-feria-realidad-virtual",
    "video-1",
    "FESTI FERIA · EXPERIENCIA VR",
    0.4,
  ),
  digitalHuman: clip(
    "miguel-grau-embajador-digital-ia",
    "video-1",
    "MUSEOS NAVALES · EMBAJADOR DIGITAL",
    0.2,
  ),
  architectural: {
    src: "proyectos/tulia-cresa/01-interior-sala.webp",
    kind: "image",
    label: "TULIA · CRESA / ARQUITECTURA",
  } as MediaAsset,
};
