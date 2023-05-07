import { allSlides } from "./allSlides";

async function main() {
  const doc = window.document;
  const parent = doc.getElementById('scratch') as HTMLElement;

  await allSlides(parent);
}

main();











