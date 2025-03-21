export default {
  font(item, options = {}) {
    const { family, source, props } = item;
    return new FontFace(family, source, props).load();
  },

  script(item, options = {}) {
    const { href } = item;
    return fetch(href, options)
      .then(async res => await res.text())
      .then(text => ({ type: "application/javascript", text }))
      .then(props => Object.assign(document.createElement("script"), props));
  },

  css(item, options = {}) {
    const { href } = item;
    return fetch(href, options)
      .then(async res => await res.text())
      .then(text => ({ innerText: text }))
      .then(props => Object.assign(document.createElement("style"), props));
  },

  image(item, options = {}) {
    const { href } = item;
    return new Promise((resolve, reject) => {
      const el = document.createElement("img");
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = href;
    });
  },

  json(item, options = {}) {
    const { href } = item;
    return fetch(href, options)
      .then(res => res.text())
      .then(text => ({ type: "application/json", text }))
      .then(props => Object.assign(props, item.props != null || {}))
      .then(props => Object.assign(document.createElement("script"), props));
  },
};
