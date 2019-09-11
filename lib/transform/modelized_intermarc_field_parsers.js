const { addClaim } = require('./claims')
const { keyBy } = require('lodash')
const parseDate = require('./parse_date')
const noticeTypes = require('./notice_types').intermarc
const recoverSourceDataFromSubfields = require('./recover_source_data_from_subfields')

const titreDeLOeuvre = (zone) => (noticeType, tag, subfields, claims) => {
  const subfieldsByCode = keyBy(subfields, 'code')
  addClaim(claims, "Titre de l'oeuvre", {
    value: subfieldsByCode.a.$t,
    references: [
      {
        'identifiant de la zone': [`intermarc_${zone}`],
        'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
      }
    ]
  })
}

module.exports = {
  leader: (leader, claims, notice) => {
    const leaderPos9 = leader[9]
    const { label, getLabel } = noticeTypes[leaderPos9]
    var type
    if (label) {
      type = label
    } else {
      const datafieldsByTags = keyBy(notice.datafield, 'tag')
      type = getLabel(datafieldsByTags)
    }
    addClaim(claims, "Type d'entité", {
      value: type,
      references: [{
        'identifiant de la zone': ['intermarc_000'],
        'données source de la zone': [ leader ]
      }]
    })
  },
  controlfield: {
    '003': (noticeType, tag, $t, claims) => {
      addClaim(claims, 'URL pérenne', {
        value: $t,
        references: [{
          'identifiant de la zone': ['intermarc_003'],
          'données source de la zone': [ $t ]
        }]
      })
    },
    '008': (noticeType, tag, $t, claims) => {
      const references = [{
        'identifiant de la zone': ['intermarc_008'],
        'données source de la zone': [ $t ]
      }]
      if (noticeType === 'p') {
        const naissance = parseDate($t.slice(28, 36))
        const deces = parseDate($t.slice(38, 46))
        addClaim(claims, 'Date de naissance', { value: naissance, references })
        addClaim(claims, 'Date de décès', { value: deces, references })
      } else if (noticeType === 's') {
        const langue = parseDate($t.slice(14, 17))
        addClaim(claims, "Langue de l'oeuvre", { value: langue, references })
      }
    }
  },
  datafield: {
    '031': (noticeType, tag, subfields, claims) => {
      const subfieldsByCode = keyBy(subfields, 'code')
      const subfield = subfieldsByCode.a || subfieldsByCode.z
      addClaim(claims, 'Identifiant ISNI', {
        value: subfield.$t,
        references: [
          {
            "Source d'import": [ subfieldsByCode['2'].$t ]
          },
          {
            'identifiant de la zone': ['intermarc_031'],
            'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
          }
        ]
      })
    },
    '045': (noticeType, tag, subfields, claims) => {
      // On non-personne notices, this field will be modelized as a relation
      if (noticeType !== 'p') return

      const subfieldsByCode = keyBy(subfields, 'code')
      addClaim(claims, 'Activité', {
        value: subfieldsByCode.a.$t,
        references: [
          {
            'identifiant de la zone': ['intermarc_045'],
            'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
          }
        ]
      })
    },
    '100': (noticeType, tag, subfields, claims) => {
      // On non-personne notices, this field will be modelized as a relation
      if (noticeType !== 'p') return

      const subfieldsByCode = keyBy(subfields, 'code')
      const references = [{
        'identifiant de la zone': ['intermarc_100'],
        'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
      }]
      addClaim(claims, 'Nom', { value: subfieldsByCode.a.$t, references })
      if (subfieldsByCode.m) {
        addClaim(claims, 'Prénom', { value: subfieldsByCode.m.$t, references })
      }
    },
    '141': titreDeLOeuvre('141'),
    '144': titreDeLOeuvre('144'),
    '145': titreDeLOeuvre('145')
  }
}
