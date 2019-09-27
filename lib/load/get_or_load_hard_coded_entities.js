const loadProperties = require('./load_properties')
const loadItems = require('./load_items')
const hardCodedEntities = require('../hard_coded_entities')
const { keyBy } = require('lodash')

var loadhardCodedEntitiesPromise

module.exports = () => {
  if (!loadhardCodedEntitiesPromise) {
    loadhardCodedEntitiesPromise = loadhardCodedEntities()
  }
  return loadhardCodedEntitiesPromise
}

const loadhardCodedEntities = () => {
  return loadhardCodedProperties()
  .then((properties) => {
    return loadhardCodedItems(properties)
    .then((items) => ({ items, properties }))
  })
}

const loadhardCodedProperties = () => {
  const pseudoProps = Object.keys(hardCodedEntities.properties)
    .reduce((props, pseudoId) => {
      const datatype = hardCodedEntities.properties[pseudoId]

      props[pseudoId] = buildPseudoProperty(pseudoId, datatype)

      return props
    }, {})
  return loadProperties(pseudoProps)
}

const buildPseudoProperty = (pseudoId, datatype) => {
  return {
    type: 'property',
    pseudoId,
    datatype,
    labels: { fr: pseudoId, en: pseudoId }
  }
}

const loadhardCodedItems = (properties) => {
  const pseudoItems = []
  const relations = []
  Object.keys(hardCodedEntities.items).forEach((pseudoId) => {
    pseudoItems.push(buildPseudoItem(pseudoId))
    const itemRelations = hardCodedEntities.items[pseudoId].relations
    if (itemRelations) {
      itemRelations.forEach(({ property, object }) => {
        relations.push({ subject: pseudoId, property, object })
      })
    }
  })
  return loadItems(pseudoItems, relations, properties)
    .then(({ entities: items }) => {
      Object.values(items).forEach(setPseudoId)
      return keyBy(items, 'pseudoId')
    })
}

const buildPseudoItem = (pseudoId, itemClaims) => {
  return {
    type: 'item',
    pseudoId,
    labels: { fr: pseudoId, en: pseudoId },
    claims: itemClaims
  }
}

const setPseudoId = (item) => { item.pseudoId = item.labels.fr.value }
