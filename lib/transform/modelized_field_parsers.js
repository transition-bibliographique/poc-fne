const { addClaim } = require('./claims')
const { buildModelizedPseudoId } = require('./notice_helpers')
const { keyBy } = require('lodash')
const parseDate = require('./parse_date')
const typesLabels = require('./types_labels')

const intermarc = {
  leader: (leader, claims) => {
    const leaderPos9 = leader[9]
    addClaim(claims, "Type d'entité", {
      value: typesLabels.intermarc[leaderPos9],
      references: [{
        'identifiant de la zone': 'intermarc_000',
        'données source de la zone': leader
      }]
    })
  },
  controlfield: {
    '003': (noticeType, tag, $t, claims) => {
      addClaim(claims, 'URL pérenne', {
        value: $t,
        references: [{
          'identifiant de la zone': 'intermarc_003',
          'données source de la zone': $t
        }]
      })
    }
  },
  datafield: {
    '031': (noticeType, tag, subfields, claims) => {
      const subfieldsByCode = keyBy(subfields, 'code')
      const value = subfieldsByCode.a.$t
      const propertyPseudoId = buildModelizedPseudoId('intermarc', noticeType, tag)

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
