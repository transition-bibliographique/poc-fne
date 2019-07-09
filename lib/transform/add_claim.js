const _ = require('lodash')
const { buildPositionPseudoId } = require('./build_pseudo_id')

const addClaim = (claims, property, value) => {
  if (isPropAlreadyDefined(claims, property)) {
    claims[property].push(value)
  } else {
    claims[property] = [ value ]
  }
}

const isPropAlreadyDefined = (claims, property) => {
  const createdClaimsProperties = _.keys(claims)
  return createdClaimsProperties.includes(property)
}

const addPositionsClaims = (schema, claims, positions, tag) => {
  positions.map((position) => {
    const pseudoPropertyId = buildPositionPseudoId(schema, tag, position)
    const value = position.$t
    addClaim(claims, pseudoPropertyId, value)
  })
}

module.exports = { addClaim, addPositionsClaims }
