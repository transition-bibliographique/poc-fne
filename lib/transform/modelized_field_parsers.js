const { addClaim } = require('./claims')
const { buildModelizedPseudoId } = require('./notice_helpers')
const { keyBy } = require('lodash')
const parseDate = require('./parse_date')

const intermarc = {
  controlfield: {
    '003': (schema, noticeType, tag, $t, claims) => {
      const propertyPseudoId = 'URL pérenne'
      const reference = {
        'identifiant de la zone': 'intermarc_003',
        'données source de la zone': $t
      }
      addClaim(claims, propertyPseudoId, {
        value: $t,
        references: [ reference ]
      })
    }
  },
  datafield: {
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
}

const unimarc = {
  controlfield: {},
  datafield: {}
}

module.exports = { intermarc, unimarc }
