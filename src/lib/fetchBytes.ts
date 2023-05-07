/**
 * Fetch bytes from a given URL.
 *
 * Example:
 *
 *  Input: http://example.com
 *
 *  Output: 0x3C 0x21 0x64 0x6F 0x74 0x79 ...
 */
export async function fetchBytes(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const bytes = await blob.arrayBuffer()
  return new Uint8ClampedArray(bytes);
}
