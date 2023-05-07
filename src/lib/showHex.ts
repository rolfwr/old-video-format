/**
 * Show a sequence of bytes as a hex dump.
 * 
 * Example:
 * 
 *   Input: 0x2b, 0xba, 0x97, 0xbb, 0xfc, 0xad
 * 
 *   Display:
 * 
 *   00000040    2b ba 97 bb fc ad                                  >+º.»ü.<
 */
export function showHex(
  parent: HTMLElement,
  data: Uint8ClampedArray | Uint8Array
) {
  const bytesPerRow = 16;

  const rowCount = Math.min(Math.ceil(data.length / bytesPerRow), 100000);
  const lines = [...Array(rowCount)].map((_, i) => hexLine(data, i, bytesPerRow));

  const hexdump = parent.ownerDocument.createElement('pre');
  hexdump.innerText = lines.join('\n');
  parent.appendChild(hexdump);
}

function hexLine(
  data: Uint8ClampedArray | Uint8Array,
  rowIndex: number,
  bytesPerRow: number)
{
  const start = rowIndex * bytesPerRow;
  const end = start + bytesPerRow;
  const rowBytes = [...data.slice(start, end)];
  return (
    start.toString(16).padStart(8, '0') +
    '    ' + 
    rowBytes.map(
      byte => byte.toString(16).padStart(2, '0')
    ).join(' ').padEnd(bytesPerRow * 3 - 1, ' ') +
    '    >' +
    rowBytes.map(byte => toPrintable(byte)).join('') +
    '<'
  );
}

/**
 * Convery bytes to ISO/IEC 8859-1 characters, swapping out non-printable
 * characters with period (".").
 */
function toPrintable(byte: number) {
  if (byte < 0x20) {
    return '.';
  }

  if (byte > 0x7E && byte < 0xA1) {
    return '.';
  }

  if (byte === 0xAD) {
    return '.';
  }

  return String.fromCodePoint(byte);
}

