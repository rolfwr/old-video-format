export function showJson(parent: HTMLElement, val: unknown) {
  const pre = parent.ownerDocument.createElement('pre');
  pre.textContent = JSON.stringify(val);
  parent.appendChild(pre);
}
