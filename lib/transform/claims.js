const _ = require('lodash')
const createDate = require('./create_date')
const { buildPositionPseudoId, buildSubfieldPseudoId } = require('./build_pseudo_id')

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

const fetchValue = (subfield) => {
  if (subfield.code === 'd') { return createDate(subfield) }
  if (subfield.$t) { return subfield.$t }
}

const addSubfieldsClaims = (schema, claims, subfields, tag) => {
  subfields.map((subfield, index) => {
    const pseudoPropertyId = buildSubfieldPseudoId(schema, subfield, index, tag)
    const value = fetchValue(subfield)
    addClaim(claims, pseudoPropertyId, value)
  })
}

module.exports = { addClaim, addPositionsClaims, addSubfieldsClaims }
