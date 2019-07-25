const { addClaim } = require('./claims')
const { buildModelizedPseudoId } = require('./notice_helpers')
const { keyBy } = require('lodash')
const parseDate = require('./parse_date')

module.exports = {
  '031': (schema, noticeType, tag, subfields, claims) => {
    const subfieldsByCode = keyBy(subfields, 'code')
    const value = subfieldsByCode.a.$t
    const propertyPseudoId = buildModelizedPseudoId(schema, noticeType, tag)

    const references = []

    if (subfieldsByCode.d) {
      references.push({
        'date de consultation': [ parseDate(subfieldsByCode.d) ]
      })
    }

    addClaim(claims, propertyPseudoId, { value, references })
  }
}
