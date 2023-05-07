import { normalize } from "./lib/normalize";
import { fetchBytes } from "./lib/fetchBytes";
import { srgbToPixels } from "./lib/srgbToPixels";
import { byteToBitmapPixels } from "./lib/bits";
import { showPixels } from "./lib/showPixels";
import { showJson } from "./lib/showJson";
import { showHex } from "./lib/showHex";

export const title = 'Vis som bitmap';

export async function slide05(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';
  const data = await fetchBytes(videoUrl);

  showPixels(parent, byteToBitmapPixels(data));

  const offset = 56; // TODO: reset
  const sliced = data.slice(offset);
  const pixels = byteToBitmapPixels(sliced);
  const widthGuess = 320; // TODO: reset
  showPixels(parent, pixels, widthGuess)

  const header = data.slice(0, offset);
  showHex(parent, header);

  const dw = new DataView(header.buffer);

  for (let i = 0; i < dw.byteLength - 2; ++i) {
    if (dw.getInt16(i) == widthGuess) {
      showJson(parent, { widthGuess, foundAtOffset: i });
    }
  }

  showJson(parent, {
    frameCount: dw.getInt32(0),
    width: dw.getInt16(4),
    height: dw.getInt16(6)
  });

  const remainder = header.slice(8);
  showHex(parent, remainder);

  showPixels(parent, srgbToPixels(remainder));
  showPixels(parent, srgbToPixels(normalize(remainder)));
}

