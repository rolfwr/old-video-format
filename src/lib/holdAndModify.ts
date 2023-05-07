export const paletteCode = 0;
export const blueCode = 1;
export const redCode = 2;
export const greenCode = 3;

export function hamDecompress(values: Uint8ClampedArray, codes: Uint8ClampedArray, palette: Uint8ClampedArray) {
  let r = 0;
  let g = 0;
  let b = 0;

  const length = Math.min(values.length, codes.length);
  const output = new Uint8ClampedArray(length * 3);
  let j = 0;
  for (let i = 0; i < length; ++i) {
    const code = codes[i];
    const value = values[i];
    switch (code) {
      case paletteCode:
        r = palette[value * 3];
        g = palette[value * 3 + 1];
        b = palette[value * 3 + 2];
        break;
      case redCode:
        r = value;
        break;
      case greenCode:
        g = value;
        break;
      case blueCode:
        b = value;
        break;
    }
    output[j++] = r;
    output[j++] = g;
    output[j++] = b;
  }
  return output;
}
