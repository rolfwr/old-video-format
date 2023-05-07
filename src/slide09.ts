import { HamVideo } from "./lib/eg1986Video";
import { fetchBytes } from "./lib/fetchBytes";

export const title = 'Spille av video i et <canvas>-element';

export async function slide09(parent: HTMLElement) {
  const data = await fetchBytes('data/movie.data');

  const hamVideo = new HamVideo(data);

  /*
  const { canvas, c2d } = makeCanvas2d(
    parent.ownerDocument,
    hamVideo.header.width,
    hamVideo.header.height
  );
  parent.appendChild(canvas);

  const pixels = hamVideo.readFramePixels();
  putCanvasPixels(c2d, pixels, hamVideo.header.width);
  */

  //function showNextFrame() {
  //}
  //showNextFrame();

  /*
  const fps = 25;
  setInterval(showNextFrame, 1000/fps);
  */
}
