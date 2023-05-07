
export async function allSlides(parent: HTMLElement) {
  const doc = parent.ownerDocument;
  const h1 = doc.createElement('h1');
  h1.innerText = 'Spørsmål?';
  parent.appendChild(h1);

  for (let i = 0; i <= 11; ++i) {
    const slideId = 'slide' + String(i).padStart(2, '0');
    const slide = await import(/* @vite-ignore */ './' + slideId);

    const details = doc.createElement('details');
    const summary = doc.createElement('summary');
    summary.innerText = slide['title'] ?? 'Slide #' + i;
    details.appendChild(summary);
    await slide[slideId](details);
    
    parent.appendChild(details);  
  }
}