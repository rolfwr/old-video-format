/**
 * Scale and adjust the values in the given array such that they span the whole
 * byte value range of 0 to 255.
 */
export function normalize(values: Uint8ClampedArray) {
  let range = minmax(values);
  const span = Math.max(range.max - range.min, 1);

  const length = values.length;
  const result = new Uint8ClampedArray(length);
  for (let i = 0; i < length; ++i) {
    result[i] = Math.round((values[i] - range.min) * 255 / span);
  }
  return result;
}

function minmax(values: Uint8ClampedArray) {
  let min = 0xFF;
  let max = 0x00;

  for (const v of values) {
    min = Math.min(min, v);
    max = Math.max(max, v);
  }

  return { min, max };
}
