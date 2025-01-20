export default function decorate(block) {
  const pTag = block.querySelector("div p");
  const pContent = pTag.textContent;
  const h2Tag = document.createElement("h2");
  h2Tag.textContent = pContent;
  pTag.replaceWith(h2Tag);
}
