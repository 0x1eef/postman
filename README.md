## About

Postman is a lightweight library that can download the
assets of a web page asynchronously. A classic use-case
might be a progress bar that is updated as assets are
downloaded.

## Example

### Postman

#### Deliver

The "deliver" method initiates the download of a parcel that includes
fonts, stylesheets and scripts. Each time an item is downloaded, the
progress event is dispatched. When all items have been downloaded, the
parcel is ready to be inserted into the DOM. Typically `document.fonts`
is used to append fonts, `document.head` is used to append styles, and
`document.body` is used to append scripts:

```javascript
import { Postman, item } from "postman";

const items = [
  item.font("Roboto Regular", "/fonts/roboto-regular.ttf"),
  item.css("/css/main.css"),
  item.script("/js/main.js")
]

const postman = Postman(...items)
postman.addEventListener("progress", (event) => {
  const { progress, parcel } = event.detail
  console.log("progress", progress)
  if (progress === 100) {
    parcel.fonts.forEach((font) => document.fonts.add(font))
    parcel.css.forEach((style) => document.head.appendChild(style))
    parcel.scripts.forEach((script) => document.body.appendChild(script))
  }
})
postman.deliver()
```

#### Error

An "error" event is dispatched when an item fails to download, and
that includes any item that was fetched with a response code other
than 200. The dispatched event provides access to an instance of
[AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
that can be used to cancel the download of the remaining items,
otherwise the download will continue:

```javascript
import { Postman, item } from "postman";

const items = [
  item.font("Roboto Regular", "/fonts/roboto-regular.ttf"),
  item.css("/css/main.css"),
  item.script("/js/main.js")
]

const postman = Postman(...items)
postman.addEventListener("error", (event) => {
  const { controller } = event.detail;
  controller.abort()
  console.error("error encountered, download cancelled")
})
postman.deliver()
```

## See also

* [https://al-quran.reflectslight.io/](https://al-quran.reflectslight.io) <br>
  Delivers all of its assets with Postman

## Sources

* [github.com/@0x1eef](https://github.com/0x1eef/postman)
* [gitlab.com/@0x1eef](https://gitlab.com/0x1eef/postman)
* [brew.bsd.cafe/@0x1eef](https://brew.bsd.cafe/0x1eef/postman)

## License

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/)
<br>
See [LICENSE](./LICENSE)

