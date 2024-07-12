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
  return [items, progresscb];
}

export { item };

export default function (...args: Args): Postman {
  const self: Postman = Object.create(null);
  const result: Package = { fonts: [], images: [], css: [], scripts: [], json: [] };
  const [items, progresscb] = parseArgs(args);
  items.sort((i1, i2) => (i1.priority >= i2.priority ? 1 : -1));

  let index = 0;
  const onProgress = <T>(el: T): T => {
    index++;
    if (index <= items.length) {
      progresscb(100 * (index / items.length));
    }
    return el;
  };

  const spawnRequests = (): Array<Promise<Package | null>> => {
    const reqs = items.map(async (item: Item | FontItem) => {
      if ("fontFamily" in item) {
        const req = request.font;
        return await req(item)
          .then(el => onProgress<FontFace>(el))
          .then(font => result.fonts.push(font))
          .then(() => result);
      } else if (item.requestId !== "font" && item.group !== "fonts") {
        const req = request[item.requestId];
        const ary = result[item.group];
        return await req(item)
          .then(el => onProgress<HTMLElement>(el))
          .then(el => ary.push(el))
          .then(() => result);
      } else {
        return null;
      }
    });
    return reqs;
  };

  self.deliver = async () => {
    await Promise.all(spawnRequests());
    return result;
  };

  return self;
}
