import type { Item, FontItem } from "./postman/item";
import item from "./postman/item";
import request from "./postman/request";

interface Postman {
  deliver: () => Promise<Package>;
}
type Args = Array<Item | FontItem | ((n: number) => number)>;
type Items = Array<Item | FontItem>;
interface Package {
  fonts: FontFace[];
  images: HTMLElement[];
  css: HTMLElement[];
  scripts: HTMLElement[];
  json: HTMLElement[];
}

function parseArgs(args: Args): [Items, (n: number) => number] {
  const items: Items = [];
  let progresscb = (n: number): number => n;
  args.forEach(item => {
    if (typeof item === "function") {
      progresscb = item;
    } else {
      items.push(item);
    }
  });
  return [items.sort((i1, i2) => (i1.priority >= i2.priority ? 1 : -1)), progresscb];
}

export { item };

export default function (...args: Args): Postman {
  const self = Object.create(null);
  const [items, progresscb] = parseArgs(args);
  const _package: Package = {
    fonts: [],
    images: [],
    css: [],
    scripts: [],
    json: [],
  };

  let index = 0;
  function onProgress<T>(el: T): T {
    index++;
    if (index <= items.length) {
      progresscb(100 * (index / items.length));
    }
    return el;
  }

  function fetch(): Array<Promise<Package | null>> {
    return items.map(async (item: Item | FontItem) => {
      if ("fontFamily" in item) {
        const req = request.font;
        return await req(item)
          .then(el => onProgress<FontFace>(el))
          .then(font => _package.fonts.push(font))
          .then(() => _package);
      } else if (item.requestId !== "font" && item.group !== "fonts") {
        const req = request[item.requestId];
        const ary = _package[item.group];
        return await req(item)
          .then(el => onProgress<HTMLElement>(el))
          .then(el => ary.push(el))
          .then(() => _package);
      } else {
        return null;
      }
    });
  }

  self.deliver = async () => {
    await Promise.all(fetch());
    return _package;
  };

  return self;
}
