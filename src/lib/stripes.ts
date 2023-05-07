
export function indicateError(event: Event | string) {
  const el: HTMLElement | undefined = (event as any).target;
  el?.setAttribute(
    'style',
    'background: ' + stripes('#b66', '#945')
  );
}

/**
 * Create a CSS repeating-linear gradient expression for diagonal stripes with
 * alternating colors.
 *
 * Example:
 *
 *   Input: #555, #222
 *
 *   Output: repeating-linear-gradient(-45deg, #555, #555 10px, #222 10px, #222
 *   20px)
 */
export function stripes(col1: string, col2: string) {
  return (
    'repeating-linear-gradient(-45deg, ' +
    col1 +
    ', ' +
    col1 + 
    ' 10px, ' +
    col2 +
    ' 10px, ' +
    col2 +
    ' 20px)'
  );
}