export const title = 'Hvordan mate en kresen nettleser med video';

export async function slide00(parent: HTMLElement) {
  const h1 = parent.ownerDocument.createElement('h1');
  h1.innerText = title;
  parent.appendChild(h1);

  const p = parent.ownerDocument.createElement('p');
  p.innerText = 'RevolverConf 2023.1';
  parent.appendChild(p);
}
