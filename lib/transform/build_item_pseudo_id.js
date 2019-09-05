const { keyBy, map } = require('lodash')

module.exports = (typeField, subfield) => {
  const { subfields } = typeField
  if (subfield) {
    return getSubfieldValue(subfields, subfield)
  } else {
    return getSubfields(subfields).join('.')
  }
}

const getSubfieldValue = (subfields, targetSubfield) => {
  const subfieldsByCode = keyBy(subfields, 'code')
  return subfieldsByCode[targetSubfield].$t
}

const getSubfields = (subfields) => map(subfields, '$t')
