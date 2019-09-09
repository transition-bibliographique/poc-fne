const createOrEnrichEntity = require('./create_or_enrich_entity')
const { keyBy, pick } = require('lodash')
const propertiesByPseudoId = {}

module.exports = (pseudoProperties) => {
  const missingPropertiesPseudoIds = Object.keys(pseudoProperties)
    .filter(isMissingProperty)

  if (missingPropertiesPseudoIds.length === 0) {
    return Promise.resolve(propertiesByPseudoId)
  }

  const missingProperties = pick(pseudoProperties, missingPropertiesPseudoIds)

  return Promise.all(createMissingProperties(missingProperties))
    .then(cacheNewProperties)
    .then(() => propertiesByPseudoId)
}

const isMissingProperty = (pseudoId) => propertiesByPseudoId[pseudoId] == null

const createMissingProperties = (missingProperties) => {
  return Object.values(missingProperties)
    .map(createOrEnrichEntity)
}

const cacheNewProperties = (properties) => {
  const newPropertiesByPseudoId = keyBy(properties, 'pseudoId')
  Object.assign(propertiesByPseudoId, newPropertiesByPseudoId)
}
