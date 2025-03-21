import item from "./postman/item";
import request from "./postman/request";

export { item };

export default function(...items) {
  const self    = new EventTarget();
  const parcel  = { fonts: [], images: [], css: [], scripts: [], json: [] };
  const byGroup = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    byGroup[item.group] = byGroup[item.group] || [];
    byGroup[item.group].push(item);
  }

  self.deliver = async () => {
    for (let group of Object.keys(byGroup)) {
      const items = byGroup[group];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const req  = request[item.requestId];
        const ary  = parcel[item.group];
        await req(item)
          .then(el => ary.push(el))
          .then(() => dispatchProgress(self, item, i))
          .catch((error) => dispatchError(self, item, error))
      }
    }
    return parcel;
  };

  return self;
}

function dispatchError(self, item, error) {
  self.dispatchEvent(
    new CustomEvent(
      "error",
      { detail: { item, error } }
    )
  );
}

function dispatchProgress(self, item, index) {
  self.dispatchEvent(
    new CustomEvent(
      "progress",
      { detail: { item, percent: 100 * (index / items.length) } }
    )
  );
}
