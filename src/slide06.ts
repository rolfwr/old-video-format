import { readHeader } from "./lib/eg1986Header";
import { fetchBytes } from "./lib/fetchBytes";
import { showJson } from "./lib/showJson";

export const title = 'Bitplan';

export async function slide06(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';
  const data = await fetchBytes(videoUrl);

  const dw = new DataView(data.buffer);
  const header = readHeader(dw, 0);
  showJson(parent, header);

  /*
  const bitplanes = data.slice(bitmapOffset);

  showPixels(parent, byteToBitmapPixels(bitplanes), header.width)
  */

  /*
  const pixels = header.width * header.height;

  showChunkedBitplanes(parent, bitplanes, pixels, 0, 1, header.width);
  */

  //ccvvvv
}

