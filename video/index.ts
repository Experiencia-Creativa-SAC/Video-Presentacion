import {
  registerRoot,
  delayRender,
  continueRender,
  cancelRender,
} from "remotion";
import { RemotionRoot } from "./Root";

// Webpack serves the existing local WOFF2 files. Block capture until all weights load.
const handle = delayRender("Poppins local");
Promise.all(
  [400, 500, 600].map((weight) =>
    document.fonts.load(`${weight} 80px Poppins`),
  ),
)
  .then(() => continueRender(handle))
  .catch(cancelRender);
registerRoot(RemotionRoot);
