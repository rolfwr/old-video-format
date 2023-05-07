import { getBit } from "./bits";
import { byteToGrayScalePixels } from "./byteToGrayScalePixels";
import { normalize } from "./normalize";
import { showPixels } from "./showPixels";

export function showChunkedBitplanes(
  parent: HTMLElement,
  bitplanes: Uint8ClampedArray,
  bitsPerPlane: number,
  firstBitplane: number,
  bitplaneCount: number,
  width: number
) {
  showPixels(
    parent,
    byteToGrayScalePixels(
      normalize(
        chunkBitplanes(bitplanes, bitsPerPlane, firstBitplane, bitplaneCount)
      )
    ),
    width
  );
}

export function chunkBitplanes(bitplanes: Uint8ClampedArray, bitsPerPlane: number, firstBitplane: number, bitplaneCount: number) {
  const output = new Uint8ClampedArray(bitsPerPlane);
  for (let i = 0; i < bitsPerPlane; ++i) {
    let collectedBits = 0;
    for (let j = 0; j < bitplaneCount; ++j) {
      if (getBit(bitplanes, bitsPerPlane * (firstBitplane + j)  + i)) {
        collectedBits |= (1 << j)
      }
    }
    output[i] = collectedBits;
  }
  return output;
}
