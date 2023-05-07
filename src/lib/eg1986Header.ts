
export const headerSize = 8;
const paletteColorCount = 16;
export const paletteSize = paletteColorCount * 3;
export const bitmapOffset = headerSize + paletteSize;

/**
 * Parse video header structure.
 * 
 * | Offset | Type  | Purpose        |
 * | ------ | ----- | -------------- |
 * |      0 | i32be | Frame count    |
 * |      4 | i16be | Image width    |
 * |      6 | i16be | Image height   |
 */
export function readHeader(dw: DataView, pos: number) {
  const frames = dw.getUint32(pos + 0);
  const width = dw.getUint16(pos + 4);
  const height = dw.getUint16(pos + 6);
  return { frames, width, height };
}
