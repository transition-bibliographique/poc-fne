const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const loadItem = require('./load_item')

module.exports = (items, wbProps) => {
  items = items.slice(0, 1)
  return Promise.all(items.map((item) => loadItem(item, wbProps)))
}
