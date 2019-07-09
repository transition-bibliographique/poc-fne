const _ = require('lodash')
const createDate = require ('./create_date')

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
    const value = position.$t
    addClaim(claims, pseudoPropertyId, value)
  })
}

const fetchValue = (subfield) => {
  if(subfield.$t){ return subfield.$t }
  if(subfield.code == 'd'){ return createDate(subfield) }
}

const addSubfieldsClaims = (schema, claims, subfields, tag) => {
  subfields.map((subfield, index) => {
    const pseudoPropertyId = buildSubfieldPseudoId(schema, subfield, index, tag)
    const value = fetchValue(subfield)
    addClaim(claims, pseudoPropertyId, value)
  })
}

module.exports = { addClaim, addPositionsClaims, addSubfieldsClaims }
