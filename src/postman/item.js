export default {
  font(family, source, props = {}) {
    return {
      priority: 1,
      group: 'fonts',
      requestId: 'font',
      family,
      source,
      props
    }
  },

  image(href, props = {}) {
    return {
      priority: 2,
      group: 'images',
      requestId: 'image',
      href,
      props
    }
  },

  css(href, props = {}) {
    return {
      priority: 3,
      group: 'css',
      requestId: 'css',
      href,
      props
    }
  },

  script(href, props = {}) {
    return {
      priority: 4,
      group: 'scripts',
      requestId: 'script',
      href,
      props
    }
  },

  json(href, props = {}) {
    return {
      priority: 5,
      group: 'json',
      requestId: 'json',
      href,
      props
    }
  }
}
