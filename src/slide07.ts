import { normalize } from "./lib/normalize";
import { hamDecompress, greenCode } from "./lib/holdAndModify";
import { srgbToPixels } from "./lib/srgbToPixels";
import { showPixels } from "./lib/showPixels";
import { byteToGrayScalePixels } from "./lib/byteToGrayScalePixels";

export const title = 'Palett and Hold-And-Modify';

export async function slide07(parent: HTMLElement) {
  const black = [ 0x00, 0x00, 0x00 ]; // Index 0
  const white = [ 0x0F, 0x0F, 0x0F ]; // Index 1
  const red   = [ 0x0C, 0x01, 0x03 ]; // Index 2
  const green = [ 0x00, 0x09, 0x04 ]; // Index 3
  const blue  = [ 0x00, 0x02, 0x06 ]; // Index 4

  const palette = new Uint8ClampedArray([black, white, red, green, blue].flat());
  showPixels(parent, srgbToPixels(normalize(palette)), 5);

  const flagData = [
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  ];
  const flag = new Uint8ClampedArray(flagData);
  showPixels(parent, byteToGrayScalePixels(normalize(flag)), 22);


  const codes = new Uint8ClampedArray(22 * 16);
  showPixels(parent, srgbToPixels(normalize(hamDecompress(flag, codes, palette))), 22);


  for (let i = 1; i < 16; ++i) {
    codes[i] = greenCode;
    flag[i] = i;
  }
  showPixels(parent, srgbToPixels(normalize(hamDecompress(flag, codes, palette))), 22);
}

