export default function decorate(block) {
  const imgEl = document.querySelector(".bio.block img");

  let authorName = "";
  if (imgEl && imgEl.getAttribute("alt")) {
    authorName = imgEl.getAttribute("alt");
  }

  if (!authorName) {
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      authorName = metaAuthor.getAttribute("content");
    }
  }

  const authorEl = document.createElement("strong");
  authorEl.textContent = authorName;

  block.appendChild(authorEl);
}
