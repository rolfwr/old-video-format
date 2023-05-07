
/**
 * Apply byte changes to HAM bit planes as described in a delta frame format.
 *
 * Bytes are updated in runs of 10, 8, 6, 4, or 2 bytes on every bitplane. The
 * delta format stores a variable number of runs for each of these sizes.
 */
export function updateFrame(planes: Uint8ClampedArray, data: Uint8ClampedArray, onePlaneByteSize: number, pos: number) {
  const runByteWidths = [10, 8, 6, 4, 2];
  const dw = new DataView(data.buffer, 0);
  for (const runByteWidth of runByteWidths) {
    const runCount = dw.getUint16(pos + 4);
    pos += 6;
    for (let i = 0; i < runCount; ++i) {
      let offset = dw.getUint16(pos);
      pos += 2;

      for (let j = 0; j < 6; ++j) {
        for (let k = 0; k < runByteWidth; ++k) {
          planes[offset + k] = data[pos++];
        }
        offset += onePlaneByteSize;
      }
    }
  }
}
