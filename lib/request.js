const fetch = require('node-fetch')

module.exports = {
  get: url => fetch(url).then(res => res.json())
}
