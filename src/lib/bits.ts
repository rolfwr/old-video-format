export function byteToBitmapPixels(data: Uint8ClampedArray) {
  const pixelCount = data.length * 8;
  const output = new Uint8ClampedArray(pixelCount * 4);
  let j = 0;
  for (let i = 0; i < pixelCount; ++i) {
    const v = getBit(data, i) ? 0xDD : 0x33;
    output[j++] = v;
    output[j++] = v;
    output[j++] = v;
    output[j++] = 0xff;
  }
  return output;
}

export function getBit(data: Uint8ClampedArray, i: number) {
  const byte = data[Math.floor(i / 8)];
  const mask = 1 << (7 - (i % 8));
  return Boolean(byte & mask);
}
