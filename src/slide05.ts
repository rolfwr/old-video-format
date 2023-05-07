import { fetchBytes } from "./lib/fetchBytes";
import { showPixels } from "./lib/showPixels";

export const title = 'Vis som bitmap';

export async function slide05(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';
  const data = await fetchBytes(videoUrl);

  showPixels(parent, data);
  // byteToBitmapPixels(data)

  /*
  const offset = 0;
  const sliced = data.slice(offset);
  const pixels = byteToBitmapPixels(sliced);
  const widthGuess = undefined;
  showPixels(parent, pixels, widthGuess)
  */

  /*
  const header = data.slice(0, offset);
  showHex(parent, header);
  */

  /*
  const dw = new DataView(header.buffer);
  for (let i = 0; i < dw.byteLength - 2; ++i) {
    if (dw.getInt16(i) == widthGuess) {
      showJson(parent, { widthGuess, foundAtOffset: i });
    }
  }
  */

  /*
  showJson(parent, {
  });
  */
  // 4,2,2

  /*
  const remainder = header.slice(8);
  showHex(parent, remainder);
  */

  //showPixels(parent, srgbToPixels(remainder));

  // normalize(remainder)
}