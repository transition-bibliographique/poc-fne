const { forceArray } = require('../utils')
const error = require('../error')

module.exports = (item, contextEntities) => {
  replaceSnaksPseudoEntities(contextEntities, item.claims)
}

const replaceSnaksPseudoEntities = (contextEntities, snaks) => {
  if (!snaks) return
  Object.keys(snaks).forEach((pseudoPropertyId) => {
    if (!contextEntities[pseudoPropertyId]) return
    const property = contextEntities[pseudoPropertyId]
    if (!property.datatype) throw error.new('missing property datatype', property)
    const propertySnaks = forceArray(snaks[pseudoPropertyId])
    snaks[property.id] = propertySnaks.map(replaceItem(property, contextEntities))
    delete snaks[pseudoPropertyId]

    propertySnaks.forEach(snak => {
      if (snak && snak.qualifiers) replaceSnaksPseudoEntities(contextEntities, snak.qualifiers)
      if (snak && snak.references) {
        snak.references = forceArray(snak.references)
        snak.references.forEach(replaceSnaksPseudoEntities.bind(null, contextEntities))
      }
    })
  })
}

const replaceItem = (property, contextEntities) => (snak) => {
  if (property.datatype !== 'wikibase-item') return snak
  if (snak.value != null) {
    snak.value = contextEntities[snak.value].id
    return snak
  } else {
    return contextEntities[snak].id
  }
}
