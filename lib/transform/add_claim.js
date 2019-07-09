const _ = require('lodash')

const addClaim = (claims, property, value) => {
  createdClaimsProperties = _.keys(claims)
  if(createdClaimsProperties.includes(property)){
    claims[property].push(value)
  } else {
    claims[property] = [ value ]
  }
}

const addPositionsClaims = (schema, claims, positions, tag) => {
  positions.map((position) => {
    const pseudoPropertyId = buildPositionPseudoId(schema, tag, position)
    value = position.$t
    addClaim(claims, pseudoPropertyId, value)
  })
}

module.exports = { addClaim, addPositionsClaims }
