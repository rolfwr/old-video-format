import { inferWidth } from "./showPixels";

export function putCanvasPixels(
  c2d: CanvasRenderingContext2D,
  data: Uint8ClampedArray,
  widthOpt?: number)
{
  const width = inferWidth(data, widthOpt);
  const imageData = new ImageData(data, width);
  c2d.putImageData(imageData, 0, 0);
}
  