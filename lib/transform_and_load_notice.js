const parseProperties = require('./transform/parse_properties')
const parseNotice = require('./transform/parse_notice')
const loadProperties = require('./load/load_properties')
const getOrLoadHardCodedEntities = require('./load/get_or_load_hard_coded_entities')
const loadItems = require('./load/load_items')

module.exports = (notice) => {
  return Promise.resolve()
    .then(() => {
      const properties = parseProperties(notice)
      const { items, relations } = parseNotice(notice)
      return Promise.all([
        getOrLoadHardCodedEntities().then((res) => res.properties),
        loadProperties(properties)
      ])
        .then(mergeProperties)
        .then((wbProps) => {
          return loadItems(items, relations, wbProps)
        })
    })
}

const mergeProperties = ([ hardCodedProperties, parsedProperties ]) => {
  return Object.assign({}, hardCodedProperties, parsedProperties)
}
