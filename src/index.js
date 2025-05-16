import item from './postman/item'
import request from './postman/request'

export { item }

export function Postman(...allItems) {
  const self = new EventTarget()
  const parcel = { fonts: [], images: [], css: [], scripts: [], json: [] }
  const controller = new AbortController()
  let count = 0;

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

  async function fetch(item) {
    const { requestId, group } = item
    const req = request[requestId]
    const assets = parcel[group]
    try {
      const asset = await req(item)
      const progress = 100 * (++count / allItems.length)
      assets.push(asset)
      dispatchProgress(item, progress)
    } catch (error) {
      dispatchError(item, error)
    }
  }

  self.deliver = async () => {
    for (let i = 0; i < allItems.length; i++) {
      if (controller.signal.aborted) {
        break
      } else {
        fetch(allItems[i])
      }
    }
    return parcel
  }

  return self
}
