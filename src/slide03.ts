import { fetchBytes } from "./lib/fetchBytes";
import { showPixels } from "./lib/showPixels";

export const title = 'Vis som RGBA pixeler';

export async function slide03(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';
  const data = await fetchBytes(videoUrl);
  showPixels(parent, data)
}
