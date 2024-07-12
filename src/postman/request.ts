import type { Item, FontItem } from "./item";

export default {
  async font(item: FontItem): Promise<FontFace> {
    const { fontFamily, href } = item;
    return await new FontFace(fontFamily, href).load();
  },

  async script(item: Item, options: RequestInit = {}): Promise<HTMLElement> {
    const { href } = item;
    return await fetch(href, options)
      .then(async res => await res.text())
      .then(text => ({ type: "application/javascript", text }))
      .then(props => Object.assign(document.createElement("script"), props));
  },

  async css(item: Item, options: RequestInit = {}): Promise<HTMLElement> {
    const { href } = item;
    return await fetch(href, options)
      .then(async res => await res.text())
      .then(text => ({ innerText: text }))
      .then(props => Object.assign(document.createElement("style"), props));
  },

  async image(item: Item): Promise<HTMLElement> {
    const { href } = item;
    return await new Promise<HTMLElement>((resolve, reject) => {
      const el = document.createElement("img");
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = href;
    });
  },

  async json(item: Item, options: RequestInit = {}): Promise<HTMLElement> {
    const { href } = item;
    return await fetch(href, options)
      .then(async res => await res.text())
      .then(text => ({ type: "application/json", text }))
      .then(props => Object.assign(props, item.props != null || {}))
      .then(props => Object.assign(document.createElement("script"), props));
  },
};
