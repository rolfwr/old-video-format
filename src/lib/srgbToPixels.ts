/**
 * Add an alpha channels to RGB values, so they can be displayed as RGBA pixels.
 *
 * Example:
 *
 *   Input: 0x84 0x12 0xc4 0x26 0x91 0x11
 *
 *   Output: 0x84 0x12 0xc4 0xFF 0x26 0x91 0x11 0xFF
 */

export function srgbToPixels(data: Uint8ClampedArray) {
  const count = Math.floor(data.length / 3);
  const output = new Uint8ClampedArray(count * 4);
  let j = 0;
  let k = 0;
  for (let i = 0; i < count; ++i) {
    output[k++] = data[j++];
    output[k++] = data[j++];
    output[k++] = data[j++];
    output[k++] = 0xff;
  }
  return output;
}
