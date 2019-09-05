const createOrEnrichEntity = require('./create_or_enrich_entity')
const { keyBy } = require('lodash')

module.exports = (pseudoProperties) => {
  return Promise.all(Object.values(pseudoProperties).map(createOrEnrichEntity))
    .then((properties) => keyBy(properties, 'pseudoId'))
}
