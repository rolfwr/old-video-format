import { slide00 } from "./slide00";

async function main() {
  const doc = window.document;
  const parent = doc.getElementById('scratch') as HTMLElement;

  await slide00(parent);
}

main();











