const { addSubfieldsClaims, addClaim } = require('./claims')
const { buildModelizedPseudoId } = require('./notice_helpers')
const { keyBy } = require('lodash')

module.exports = (schema, noticeType, claims, datafields) => {
  datafields.map(field => {
    const { tag, subfields } = field
    if (tag === '031') {
      const subfieldsByCode = keyBy(subfields, 'code')
      const value = subfieldsByCode.a.$t
      const propertyPseudoId = buildModelizedPseudoId(schema, noticeType, tag)
      addClaim(claims, propertyPseudoId, { value, references: [] })
    } else {
      addSubfieldsClaims(schema, claims, subfields, tag)
    }
  })
}
