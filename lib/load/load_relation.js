const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const { get } = require('../request')
const loadProperties = require ('./load_properties')

module.exports = (relation, items) => {
  const property = buildPropertyObj(relation.property)
  const properties = {}
  properties[property.pseudoId] = property
  return loadProperties(properties)
  .then((res) => {
    const id = findIdFromPseudoId(items, relation.subject)
    const value = findIdFromPseudoId(items, relation.object)
    return wbEdit.claim.add(config, {
      id,
      property: property.id,
      value
    })
  })
}

const findIdFromPseudoId = (items, pseudoId) => {
  return items.find((item)=> item.pseudoId === pseudoId).id
}

const buildPropertyObj = (property) => {
  return {
    type: 'property',
    pseudoId: property,
    datatype: 'wikibase-item',
    labels: { fr: property, en: property }
  }
}
