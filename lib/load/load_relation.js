const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const { get } = require('../request')
const loadProperties = require ('./load_properties')
const wikibase = require('../wikibase')
const { simplify } = require('wikibase-sdk')

module.exports = (relation, itemsByPseudoIds) => {
  const property = buildPropertyObj(relation.property)
  const properties = {}
  properties[property.pseudoId] = property
  return loadProperties(properties)
  .then((res) => {
    const subjectId = itemsByPseudoIds[relation.subject].id
    const propertyId = res[property.pseudoId].id
    const objectId = itemsByPseudoIds[relation.object].id
    return addRelationIfMissing(subjectId, propertyId, objectId)
  })
}

const addRelationIfMissing = (subjectId, propertyId, objectId) => {
  return wikibase.getEntity(subjectId)
  .then((entity) => {
    const claim = findClaim(entity.claims, propertyId, objectId)
    if (claim) return { claim }
    return wbEdit.claim.create({
      id: subjectId,
      property: propertyId,
      value: objectId
    })
  })
}

const findClaim = (claims, propertyId, objectId) => {
  const propertyClaims = claims[propertyId]
  if (!propertyClaims) return
  return propertyClaims.find((claim) => {
    const claimValue = simplify.claim(claim)
    return claimValue === objectId
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
