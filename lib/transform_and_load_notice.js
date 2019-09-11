const parseProperties = require('./transform/parse_properties')
const parseNotice = require('./transform/parse_notice')
const getContextEntities = require('../lib/load/get_context_entities')
const loadItems = require('./load/load_items')

module.exports = (notice) => {
  return Promise.resolve()
    .then(() => {
      const properties = parseProperties(notice)
      const { items, relations } = parseNotice(notice)
      return getContextEntities(properties)
        .then((contextEntities) => {
          return loadItems(items, relations, contextEntities)
        })
    })
}
