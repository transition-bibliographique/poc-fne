const { addClaim } = require('./claims')
const { buildModelizedPseudoId } = require('./notice_helpers')
const { keyBy } = require('lodash')
const parseDate = require('./parse_date')
const typesLabels = require('./types_labels').unimarc
const recoverSourceDataFromSubfields = require('./recover_source_data_from_subfields')

module.exports = {
  controlfield: {
    '003': (noticeType, tag, $t, claims) => {
      addClaim(claims, 'URL pérenne', {
        value: $t,
        references: [{
          'identifiant de la zone': 'unimarc_003',
          'données source de la zone': $t
        }]
      })
    },
    '008': (noticeType, tag, $t, claims) => {
      const typeCode = parseDate($t.slice(0, 2))
      addClaim(claims, "Type d'entité", {
        value: typesLabels[typeCode],
        references: [{
          'identifiant de la zone': 'unimarc_008',
          'données source de la zone': $t
        }]
      })
    },
  },
  datafield: {
    '010': (noticeType, tag, subfields, claims) => {
      const subfieldsByCode = keyBy(subfields, 'code')
      addClaim(claims, 'Identifiant ISNI', {
        value: subfieldsByCode.a.$t,
        references: [
          {
            "Source d'import": subfieldsByCode['2'].$t
          },
          {
            'identifiant de la zone': 'unimarc_010',
            'données source de la zone': recoverSourceDataFromSubfields(subfields)
          }
        ]
      })
    }
  }
}
