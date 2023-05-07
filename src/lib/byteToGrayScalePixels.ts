/**
 * Convert each byte into an RGBA pixel showing the grayscale value of the byte.
 *
 * The alpha channel is set to completely opaque.
 *
 * Example:
 *
 *  Input: 0xFF 0x00 0x42
 *
 *  Output: 0xFF 0xFF 0xFF 0xFF 0x00 0x00 0x00 0xFF 0x42 0x42 0x42 0xFF
 */
export function byteToGrayScalePixels(data: Uint8ClampedArray) {
  const len = data.length;
  const output = new Uint8ClampedArray(len * 4);
  let j = 0;
  for (let i = 0; i < len; ++i) {
    const v = data[i];
    output[j++] = v;
    output[j++] = v;
    output[j++] = v;
    output[j++] = 0xFF;
  }
  return output;
}
