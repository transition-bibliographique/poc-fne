const _ = require('lodash')
const parseDate = require('./parse_date')
const { buildPositionPseudoId, buildSubfieldPseudoId } = require('./build_pseudo_id')
const recoverFieldValueFromPositions = require('../recover_field_value_from_positions')

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
  if (subfield.code === 'd') { return parseDate(subfield) }
  else if (subfield.$t) { return subfield.$t }
  else if (subfield.Pos) { return recoverFieldValueFromPositions(subfield.Pos) }
}

const addSubfieldsClaims = (schema, claims, subfields, tag) => {
  subfields.map((subfield, index) => {
    const pseudoPropertyId = buildSubfieldPseudoId(schema, subfield, index, tag)
    const value = fetchValue(subfield)
    addClaim(claims, pseudoPropertyId, value)
  })
}

module.exports = { addClaim, addPositionsClaims, addSubfieldsClaims }
