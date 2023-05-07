import { indicateError } from "./lib/stripes";

export const title = 'Prøv å laste data direkte inn i et <video>-element';

export async function slide01(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';

  const video = parent.ownerDocument.createElement('video')
  video.onerror = indicateError;
  video.src = videoUrl;
  parent.appendChild(video);
}
