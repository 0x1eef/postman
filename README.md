## About

Postman is a lightweight library that can download the
assets of a web page asynchronously. A classic use-case
might be a progress bar that is updated as assets are
downloaded.

## Example

### Postman

#### Deliver

The [deliver]() method returns a Promise that resolves to an object
that contains the items that have been downloaded. The items are then 
ready to be inserted into the DOM. Typically `document.fonts` is used 
to add  fonts, `document.head` is used to append styles, and `document.body` 
is used to append scripts:

```javascript
import { Postman, item } from "postman";

const items = [
  item.font("Roboto Regular", "/fonts/roboto-regular.ttf"),
  item.css("/css/main.css"),
  item.script("/js/main.js")
]

(async function() {
  const postman = Postman(...items)
  const parcel = await postman.deliver()
  parcel.fonts.forEach((font) => document.fonts.add(font))
  parcel.css.forEach((style) => document.head.appendChild(style))
  parcel.scripts.forEach((script) => document.body.appendChild(script))
})()
```

#### Progress

The [Postman]() function returns an object that extends the [EventTarget]()
interface. The "progress" event is dispatched each time an asset is downloaded,
and the event includes the overall progress of the download and the item that
has been downloaded:

```javascript
import { Postman, item } from "postman";

const items = [
  item.font("Roboto Regular", "/fonts/roboto-regular.ttf"),
  item.css("/css/main.css"),
  item.script("/js/main.js")
]

(function() {
  const postman = Postman(...items)
  postman.addEventListener("progress", (event) => console.log(event.detail))
  postman.deliver()
})()
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

