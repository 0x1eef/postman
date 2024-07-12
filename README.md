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
  <style>
    html, html body { height: 100%; }
    main.postman {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    main.postman progress {
      max-width: 200px;
    }
    main.postman .percent {
      font-family: courier;
      font-size: smaller;
    }
  </style>
</head>
<body>
  <main class="postman">
    <label>
      <progress id="progress" value="0" max="100"></progress>
    </label>
  </main>
</body>
</html>
```

**delivery.js**

```typescript
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

