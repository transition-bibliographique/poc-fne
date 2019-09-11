const getOrLoadHardCodedEntities = require('./get_or_load_hard_coded_entities')
const loadProperties = require('./load_properties')

module.exports = (pseudoProperties) => {
  return Promise.all([
    getOrLoadHardCodedEntities(),
    loadProperties(pseudoProperties)
  ])
    .then(([ hardCodedEntities, parsedProperties ]) => {
      const { properties, items } = hardCodedEntities
      return Object.assign({}, properties, items, parsedProperties)
    })
}
