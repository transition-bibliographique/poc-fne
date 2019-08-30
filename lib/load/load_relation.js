const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const { get } = require('../request')
const loadProperties = require ('./load_properties')

module.exports = (relation, itemsByPseudoIds) => {
  const property = buildPropertyObj(relation.property)
  const properties = {}
  properties[property.pseudoId] = property
  return loadProperties(properties)
  .then((res) => {
    const id = itemsByPseudoIds[relation.subject].id
    const propertyId = res[property.pseudoId].id
    const value = itemsByPseudoIds[relation.object].id
    return wbEdit.claim.create({ id, property: propertyId, value })
  })
}

const buildPropertyObj = (property) => {
  return {
    type: 'property',
    pseudoId: property,
    datatype: 'wikibase-item',
    labels: { fr: property, en: property }
  }
}
