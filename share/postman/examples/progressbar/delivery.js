import postman, { item } from "postman";
document.addEventListener("DOMContentLoaded", () => {
  const postman = document.querySelector("main.postman");
  const bar = postman.querySelector("progress");
  const span = postman.querySelector(".percent");
  const delivery = postman(
    item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
    item.script("/js/app.js"),
    item.image("/images/app.png"),
    item.css("/css/app.css"),
    item.progress((percent) => {
      bar.value = percent;
      bar.innerText = span.innerText = `${percent}%`;
    })
  ).deliver();

  delivery.then((package) => {
    /* Add page assets */
    package.fonts.forEach((font) => documents.fonts.add(font));
    package.scripts.forEach((script) => document.body.appendChild(script));
    package.css.forEach((css) => document.head.appendChild(css));
    /* Replace loading screen */
    postman.remove();
  });
});
