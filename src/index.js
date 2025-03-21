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
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const req = request[item.requestId];
        const ary = parcel[item.group];
        const percentage = 100 * (index / items.length);
        await req(item)
          .then(el => ary.push(el))
          .then(() => dispatchProgress(self, item, percentage))
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

function dispatchProgress(self, item, percentage) {
  self.dispatchEvent(
    new CustomEvent(
      "progress",
      { detail: { item, percentage } }
    )
  );
}
