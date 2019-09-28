const _ = require('lodash')
const parseDate = require('./parse_date')
const { buildLeaderPseudoId, buildSubfieldPseudoId, buildControlfieldPseudoId } = require('./build_pseudo_id')
const recoverFieldValueFromPositions = require('../recover_field_value_from_positions')

const addClaim = (claims, property, value) => {
  if ( value == undefined ) return
  // Drop claims with empty values
  if (_.isPlainObject(value) && (value.value == null)) return
  // Drop claims with empty strings and only spaces as value
  if (_.isString(value.value) && (value.value.trim() === '' )) return
  // Trim values
  if (_.isString(value) && (value.endsWith(' '))) {
    var value = value.trim()
  }
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

const addLeaderClaims = (schema, claims, value) => {
  const pseudoPropertyId = buildLeaderPseudoId(schema)
  addClaim(claims, pseudoPropertyId, value)
}

const addControlfieldClaims = (schema, claims, value, tag) => {
  const pseudoPropertyId = buildControlfieldPseudoId(schema, tag)
  addClaim(claims, pseudoPropertyId, value)
}

const fetchValue = (subfield) => {
  if (subfield.code === 'd') return parseDate(subfield)
  else if (subfield.$t) return subfield.$t
  else if (subfield.Pos) return recoverFieldValueFromPositions(subfield.Pos)
}

const addSubfieldsClaims = (schema, claims, subfields, tag) => {
  subfields.map((subfield, index) => {
    const pseudoPropertyId = buildSubfieldPseudoId(schema, subfield, index, tag)
    const value = fetchValue(subfield)
    addClaim(claims, pseudoPropertyId, value)
  })
}

module.exports = { addClaim, addLeaderClaims, addSubfieldsClaims, addControlfieldClaims }
