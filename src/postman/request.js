export default {
  font(item, _options = {}) {
    const { family, source, props } = item;
    return new FontFace(family, source, props).load();
  },

  image(item, _options = {}) {
    const { href, props } = item;
    return new Promise((resolve, reject) => {
      const el = Object.assign(document.createElement("img"), props);
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = href;
    });
  },

  script(item, options = {}) {
    const { href, props } = item;
    return fetch(href, options)
      .then(async res => await res.text())
      .then(text => ({ type: "application/javascript", text, ...props }))
      .then(props => Object.assign(document.createElement("script"), props));
  },

  css(item, options = {}) {
    const { href, props } = item;
    return fetch(href, options)
      .then(async res => await res.text())
      .then(text => ({ innerText: text, ...props }))
      .then(props => Object.assign(document.createElement("style"), props));
  },

  json(item, options = {}) {
    const { href, props } = item;
    return fetch(href, options)
      .then(res => res.text())
      .then(text => ({ type: "application/json", text, ...props }))
      .then(props => Object.assign(document.createElement("script"), props));
  },
};
