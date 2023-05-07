import { fetchBytes } from "./lib/fetchBytes";
import { showPixels } from "./lib/showPixels";

export const title = 'Vis som et gråskala bilde';

export async function slide04(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';
  const data = await fetchBytes(videoUrl);
  showPixels(parent, data)

  //const pixels = byteToGrayScalePixels(data);
}
