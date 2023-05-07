import { fetchBytes } from "./lib/fetchBytes";
import { byteToGrayScalePixels } from "./lib/byteToGrayScalePixels";
import { showPixels } from "./lib/showPixels";

export const title = 'Vis som et gråskala bilde';

export async function slide04(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';
  const data = await fetchBytes(videoUrl);
  const pixels = byteToGrayScalePixels(data);
  showPixels(parent, pixels)
}
