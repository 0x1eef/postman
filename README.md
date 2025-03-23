## About

Postman is a lightweight library that can download the
assets of a web page asynchronously. A classic use-case
might be a progress bar that is updated as assets are
downloaded. Assets are downloaded in the order they are
given &ndash; and divided into five categories: fonts,
scripts, text, images, and stylesheets.

## Example

### Postman

#### EventTarget

The [Postman]() function returns an object that extends
the
[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
interface. The object can be used to listen for the `progress`
event, and the `deliver` method initiates the download of assets.
The `deliver` method returns a Promise that resolves to an object
that contains the downloaded assets. The assets are then ready to
be inserted into the DOM:

```javascript
import Postman, { item } from "postman";

(async function() {
  const postman = Postman(
    item.font("Roboto Regular", {url "/fonts/roboto-regular.ttf"}),
    item.script("/scripts/main.js")
  )
  postman.addEventListener("progress", (event) => {
    console.log(`${event.detail.percentage}%`)
  })

  const parcel = await postman.deliver()
  parcel.fonts.forEach((font) => document.fonts.add(font))
  parcel.scripts.forEach((script) => document.body.appendChild(script))
  console.log("Delivery complete")
})()
```

#### Error

When an error occurs during the download of an asset, an "error" event
will be dispatched. The event object contains the item that caused the error,
alongside an error message:

```javascript
import Postman, { item } from "postman";

(async function() {
  const postman = Postman(
    item.font("Roboto Regular", {url "/path/to/error"}),
  )
  postman.addEventListener("error", (event) => {
    console.error(event.detail.message)
  })
  const parcel = await postman.deliver()
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

