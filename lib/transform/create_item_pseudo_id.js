const { keyBy } = require('lodash')

module.exports = (typeField, subfield = false) => {
  const { subfields } = typeField
  if (subfield === false) {
    return getSubfields(subfields).join('.')
  }
  return getSubfieldValue(subfields, subfield)
}

const getSubfieldValue = (subfields, targetSubfield) => {
  const subfieldsByCode = keyBy(subfields, 'code')
  return subfieldsByCode[targetSubfield].$t
}

const getSubfields = (subfields) => {
  return subfields.map((subfield) => {
    return subfield.$t
  })
}
