import { bitmapOffset, readHeader } from "./lib/eg1986Header";
import { fetchBytes } from "./lib/fetchBytes";
import { byteToBitmapPixels } from "./lib/bits";
import { showPixels } from "./lib/showPixels";
import { showJson } from "./lib/showJson";
import { showChunkedBitplanes } from "./lib/bitplanes";

export const title = 'Bitplan';

export async function slide06(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';
  const data = await fetchBytes(videoUrl);

  const dw = new DataView(data.buffer);
  const header = readHeader(dw, 0);
  showJson(parent, header);

  const bitplanes = data.slice(bitmapOffset);

  showPixels(parent, byteToBitmapPixels(bitplanes), header.width)

  const pixels = header.width * header.height;

  showChunkedBitplanes(parent, bitplanes, pixels, 0, 1, header.width);
  showChunkedBitplanes(parent, bitplanes, pixels, 0, 6, header.width); // TODO RESET
  showChunkedBitplanes(parent, bitplanes, pixels, 0, 4, header.width); // TODO RESET
  showChunkedBitplanes(parent, bitplanes, pixels, 4, 2, header.width); // TODO RESET
}

