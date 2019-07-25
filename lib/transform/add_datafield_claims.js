const { addSubfieldsClaims, addClaim } = require('./claims')
const { keyBy } = require('lodash')

module.exports = (schema, claims, datafields) => {
  datafields.map(field => {
    const { tag, subfields } = field
    if (tag === '031') {
      const subfieldsByCode = keyBy(subfields, 'code')
      const value = subfieldsByCode.a.$t
      addClaim(claims, 'interxmarc:s:031', { value })
    } else {
      addSubfieldsClaims(schema, claims, subfields, tag)
    }
  })
}
