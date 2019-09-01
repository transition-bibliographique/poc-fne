const { addClaim } = require('./claims')
const { buildModelizedPseudoId } = require('./notice_helpers')
const { keyBy } = require('lodash')
const parseDate = require('./parse_date')
const typesLabels = require('./types_labels')
const recoverSourceDataFromSubfields = require('./recover_source_data_from_subfields')

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
      addClaim(claims, 'Identifiant ISNI', {
        value: subfieldsByCode.a.$t,
        references: [
          {
            "Source d'import": subfieldsByCode['2'].$t
          },
          {
            'identifiant de la zone': 'intermarc_031',
            'données source de la zone': recoverSourceDataFromSubfields(subfields)
          }
        ]
      })
    }
  }
}

const unimarc = {
  controlfield: {},
  datafield: {}
}

module.exports = { intermarc, unimarc }
