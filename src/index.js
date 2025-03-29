import item from './postman/item'
import request from './postman/request'

export { item }

export function Postman(...allItems) {
  const self = new EventTarget()
  const parcel = { fonts: [], images: [], css: [], scripts: [], json: [] }
  const controller = new AbortController()

  function dispatchError(item, error) {
    self.dispatchEvent(
      new CustomEvent(
        'error',
        { detail: { item, parcel, error, controller } }
      )
    )
  }

  function dispatchProgress(item, progress) {
    if (controller.signal.aborted)
      return
    else
      self.dispatchEvent(
        new CustomEvent(
          'progress',
          { detail: { item, parcel, progress, controller } }
        )
      )
  }

  async function fetch(item, i) {
    const req = request[item.requestId]
    const ary = parcel[item.group]
    const progress = 100 * (i / allItems.length)
    req(item)
      .then(el => ary.push(el))
      .then(() => dispatchProgress(item, progress))
      .catch((error) => dispatchError(item, error))
  }

  self.deliver = async () => {
    for (let i = 0; i < allItems.length; i++) {
      if (controller.signal.aborted) {
        break
      } else {
        await fetch(allItems[i], i+1)
      }
    }
    return parcel
  }

  return self
}
