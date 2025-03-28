import {
  createOptimizedPicture,
  fetchPlaceholders,
} from "../../scripts/aem.js";

export default async function decorate(block) {
  // fetch placeholders from the 'en' folder
  const placeholders = await fetchPlaceholders();
  const { click } = placeholders;
  /* change to ul, li */
  const ul = document.createElement("ul");
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = click;
    while (row.firstElementChild) li.append(row.firstElementChild);
    li.appendChild(link);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture")) {
        div.className = "cards-card-image";
      } else div.className = "cards-card-body";
    });
    ul.append(li);
  });
  ul.querySelectorAll("picture > img").forEach((img) =>
    img
      .closest("picture")
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }]),
      ),
  );
  block.textContent = "";
  block.append(ul);
}
