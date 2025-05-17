export default {
  font(item, _options = {}) {
    const { family, href, props } = item
    return new FontFace(family, `url(${href})`, props).load()
  },

  image(item, _options = {}) {
    const { href, props: { dataset, ...rest } } = item
    const img = document.createElement('img')
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(el)
      img.onerror = reject
      img.src = href
      Object.assign(img, rest)
      Object.assign(img.dataset, dataset)
    })
  },

  script(item, options = {}) {
    const { href, props: { dataset, ...rest } } = item
    const script = document.createElement('script')
    return fetch(href, options)
      .then(async res => await res.text())
      .then(text => Object.assign(script, { text }))
      .then(props => Object.assign(props, { type: 'text/javascript' }))
      .then(props => Object.assign(props, rest))
      .then(props => Object.assign(props.dataset, dataset))
      .then(() => script)
  },

  css(item, options = {}) {
    const { href, props: { dataset, ...rest } } = item
    const style = document.createElement('style')
    return fetch(href, options)
      .then(async res => await res.text())
      .then(innerText => Object.assign(style, { innerText }))
      .then(props => Object.assign(props, rest))
      .then(props => Object.assign(props.dataset, dataset))
      .then(() => style)
  },

  json(item, options = {}) {
    const { href, props: { dataset, ...rest } } = item
    const script = document.createElement('script')
    return fetch(href, options)
      .then(res => res.text())
      .then(text => Object.assign(script, { text }))
      .then(props => Object.assign(props, { type: 'application/json' }))
      .then(props => Object.assign(props, rest))
      .then(props => Object.assign(props.dataset, dataset))
      .then(() => script)
  }
}

function BadResponseError(res) {
  const error = new Error()
  error.name = 'BadResponseError'
  error.message = `Bad response: ${res.status} ${res.statusText}`
  error.response = res
  return error
}

function fetch(href, options) {
  return window.fetch(href, options).then(res => {
    if (res.ok) {
      return res
    } else {
      throw BadResponseError(res)
    }
  })
}
