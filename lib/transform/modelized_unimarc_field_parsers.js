const { addClaim } = require('./claims')
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
          'identifiant de la zone': [ 'unimarc_003' ],
          'données source de la zone': [ $t ]
        }]
      })
    },
    '008': (noticeType, tag, $t, claims) => {
      const typeCode = parseDate($t.slice(0, 2))
      addClaim(claims, "Type d'entité", {
        value: typesLabels[typeCode],
        references: [{
          'identifiant de la zone': [ 'unimarc_008' ],
          'données source de la zone': [ $t ]
        }]
      })
    }
  },
  datafield: {
    '010': (noticeType, tag, subfields, claims) => {
      const subfieldsByCode = keyBy(subfields, 'code')
      addClaim(claims, 'Identifiant ISNI', {
        value: subfieldsByCode.a.$t,
        references: [
          {
            "Source d'import": [ subfieldsByCode['2'].$t ]
          },
          {
            'identifiant de la zone': [ 'unimarc_010' ],
            'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
          }
        ]
      })
    },
    '101': (noticeType, tag, subfields, claims) => {
      // On non-personne notices, this field will be modelized as a relation
      if (typesLabels[noticeType] !== 'œuvre') return

      const subfieldsByCode = keyBy(subfields, 'code')
      addClaim(claims, "Langue de l'oeuvre", {
        value: subfieldsByCode.a.$t,
        references: [
          {
            'identifiant de la zone': [ 'unimarc_101' ],
            'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
          }
        ]
      })
    },
    '103': (noticeType, tag, subfields, claims) => {
      // On non-personne notices, this field will be modelized as a relation
      if (noticeType !== 'Tp') return

      const subfieldsByCode = keyBy(subfields, 'code')
      const references = [{
        'identifiant de la zone': [ 'unimarc_103' ],
        'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
      }]
      const naissance = parseDate(subfieldsByCode.a.$t)
      addClaim(claims, 'Date de naissance', { value: naissance, references })
      if (subfieldsByCode.b) {
        const deces = parseDate(subfieldsByCode.b.$t)
        addClaim(claims, 'Date de décès', { value: deces, references })
      }
    },
    '200': (noticeType, tag, subfields, claims) => {
      // On non-personne notices, this field will be modelized as a relation
      if (noticeType !== 'Tp') return

      const subfieldsByCode = keyBy(subfields, 'code')
      const references = [{
        'identifiant de la zone': [ 'unimarc_200' ],
        'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
      }]
      addClaim(claims, 'Nom', { value: subfieldsByCode.a.$t, references })
      if (subfieldsByCode.b) {
        addClaim(claims, 'Prénom', { value: subfieldsByCode.b.$t, references })
      }
    },
    '230': (noticeType, tag, subfields, claims) => {
      const subfieldsByCode = keyBy(subfields, 'code')
      addClaim(claims, "Titre de l'oeuvre", {
        value: subfieldsByCode.a.$t,
        references: [
          {
            'identifiant de la zone': [ `unimarc_230` ],
            'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
          }
        ]
      })
    },
    '240': (noticeType, tag, subfields, claims) => {
      const subfieldsByCode = keyBy(subfields, 'code')
      addClaim(claims, "Titre de l'oeuvre", {
        value: subfieldsByCode.t.$t,
        references: [
          {
            'identifiant de la zone': [ `unimarc_240` ],
            'données source de la zone': [ recoverSourceDataFromSubfields(subfields) ]
          }
        ]
      })
    }
  }
}
