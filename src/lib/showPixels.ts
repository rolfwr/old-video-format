import { stripes } from "./stripes";

export function showPixels(
  parent: HTMLElement,
  data: Uint8ClampedArray,
  widthOpt?: number
) {
  const width = inferWidth(data, widthOpt);
  const height = Math.min(
    Math.floor(Math.floor(data.length / 4) / width),
    maxHeight
  );
  const { canvas, c2d } = makeCanvas2d(parent.ownerDocument, width, height);

  /*
    The ImageData constructor will complain if the size of the data doesn't
    match a multiple of the width. We therefore trim the data so that it does
    not contain any incomplete rows of pixels.
  */
  const expectedPixelByteCount = width * height * 4;
  const trimmedData = data.slice(0, expectedPixelByteCount);
  const imageData = new ImageData(trimmedData, width);

  c2d.putImageData(imageData, 0, 0);
  
  parent.appendChild(canvas);
}

// Firefox won't show images with a height larger tnan this.
const maxHeight = 3905;

/**
 * When no width is specified, aim for displaying the pixels in a close to
 * square canvas.
 */
export function inferWidth(data: Uint8ClampedArray, width: number | undefined) {
  return width ?? Math.ceil(Math.sqrt(data.length / 4));
}

export function makeCanvas2d(doc: Document, width: number, height: number) {
  const canvas = doc.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  /*
    Make a striped background, so that it is easy to get a feeling for how
    transparent pixels are.
  */
  canvas.setAttribute(
    'style',
    'background: ' + stripes('#555', '#222')
  );
  canvas.style.minWidth = '80%';
  canvas.style.imageRendering = 'pixelated';
  const c2d = canvas.getContext('2d');
  if (!c2d) {
    throw new Error('Need context 2d');
  }
  return { canvas, c2d };
}
