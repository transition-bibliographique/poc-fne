const fetch = require('node-fetch')
const error = require('./error')

module.exports = {
  get: (url) => {
    return fetch(url)
      .then((res) => res.text().then(parseText))
  }
}

const parseText = (text) => {
  try {
    return JSON.parse(text)
  } catch (err) {
    throw error.new('invalid json', { responseText: text })
  }
}
