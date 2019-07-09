const _ = require('lodash')
const createDate = require ('./create_date')
const { buildDatafieldPseudoId } = require('./build_pseudo_id')

module.exports = (schema, claims, datafields) => {
  datafields.map( field => { addClaims(schema, claims, field) })
}

const addClaims = (schema, claims, field) => {
  const { tag, subfields } = field
  subfields.map((subfield, index) => {
    const pseudoPropertyId = buildDatafieldPseudoId(schema, subfield, index, tag)
    value = fetchValue(subfield)
    addClaim(claims, pseudoPropertyId, value)
  })
}

const fetchValue = (subfield) => {
  if(subfield.$t){ return subfield.$t }
  if(subfield.code == 'd'){ return createDate(subfield) }
}

const addClaim = (claims, property, value) => {
  createdClaimsProperties = _.keys(claims)
  if(createdClaimsProperties.includes(property)){
    claims[property].push(value)
  } else {
    claims[property] = [ value ]
  }
}
