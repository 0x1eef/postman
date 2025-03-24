import item from './postman/item'
import request from './postman/request'

export { item }

export function Postman(...allItems) {
  const self = new EventTarget()
  const parcel = { fonts: [], images: [], css: [], scripts: [], json: [] }
  const byGroup = {}

  function dispatchError(item, error) {
    self.dispatchEvent(
      new CustomEvent(
        'error',
        { detail: { item, error } }
      )
    )
  }

  function dispatchProgress(item, percentage) {
    self.dispatchEvent(
      new CustomEvent(
        'progress',
        { detail: { item, percentage } }
      )
    )
  }

  async function fetch(items, i) {
    for (let j = 0; j < items.length; j++) {
      const item = items[j]
      const req = request[item.requestId]
      const ary = parcel[item.group]
      const percentage = 100 * (i / allItems.length)
      await req(item)
        .then(el => ary.push(el))
        .then(() => dispatchProgress(item, percentage))
        .catch((error) => dispatchError(item, error))
    }
  }

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i]
    byGroup[item.group] = byGroup[item.group] || []
    byGroup[item.group].push(item)
  }

  self.deliver = async () => {
    let i = 1
    Object
      .keys(byGroup)
      .forEach((group) => fetch(byGroup[group], i++))
    return parcel
  }

  return self
}
