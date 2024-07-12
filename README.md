## About

Postman delivers the assets of a web page. <br>
The library is typically paired with a progress
bar that reports progress to the client.

## Examples

### Progress bar

The following example delivers fonts, scripts, images
and stylesheets with the help of a progress bar. The
progress bar is removed once the delivery is complete:

**index.html**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Postman</title>
  <script type="module" src="delivery.js"></script>
</head>
<body>
  <div class="postman loader">
    <progress value="0" max="100"></progress>
    <span class="percentage"></span>
   </div>
  </div>
</body>
</html>
```

**delivery.js**

```typescript
import postman, { item } from "postman";
document.addEventListener("DOMContentLoaded", () => {
  const bar = document.querySelector("progress");
  const span = document.querySelector(".percentage");
  const delivery = postman(
    item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
    item.script("/js/app.js"),
    item.image("/images/app.png"),
    item.css("/css/app.css"),
    item.progress((percent) => {
      bar.value = percent;
      span.innerText = `${percent}%`;
    })
  ).deliver();

  delivery.then((package) => {
    /* Add page assets */
    package.fonts.forEach((font) => documents.fonts.add(font));
    package.scripts.forEach((script) => document.body.appendChild(script));
    package.css.forEach((css) => document.head.appendChild(css));
    /* Replace progress bar */
    bar.remove();
    span.remove();
  });
});
```

## See also

* [https://al-quran.reflectslight.io/](https://al-quran.reflectslight.io) <br>
  Delivers all of its assets with Postman
  
## Sources

* [GitHub](https://github.com/0x1eef/postman)
* [GitLab](https://gitlab.com/0x1eef/postman)
* [brew.bsd.cafe/@0x1eef](https://brew.bsd.cafe/@0x1eef)

## License

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/)
<br>
See [LICENSE](./LICENSE)

