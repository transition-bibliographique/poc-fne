const { forceArray, findMatch } = require('../utils')

const conceptIntermarcFields = [
  '160',
  '164',
  '166',
  '466'
]

const lieuIntermarcFields = [
  '167',
  '467'
]

// Source: https://github.com/abes-esr/poc-fne/issues/201#issue-482689711
const intermarc = [
  {
    label: 'œuvre',
    pseudoIdField: '145',
    noticeType: 's'
  },
  {
    label: 'personne',
    pseudoIdField: '100',
    noticeType: 'p'
  },
  {
    // Needs more information to be desambiguated
    // See modelized_intermarc_field_parsers
    // label: 'concept|lieu',
    getLabel: (datafieldsByTags) => {
      const tags = Object.keys(datafieldsByTags)
      // See https://github.com/abes-esr/poc-fne/issues/201#issuecomment-527909016
      // and concept/lieu properties with "forme retenue" and "forme rejetée"
      // in echantillons/BNF_Intermarc_properties.json
      if (findMatch(conceptIntermarcFields, tags)) return 'concept'
      if (findMatch(lieuIntermarcFields, tags)) return 'lieu'
    },
    noticeType: 'm',
    getPseudoIdField: (datafieldsByTags) => {
      const tags = Object.keys(datafieldsByTags)
      return findMatch(conceptIntermarcFields, tags) || findMatch(lieuIntermarcFields, tags)
    }
  },
  {
    label: 'lieu',
    pseudoIdField: '170',
    noticeType: 'l'
  },
  {
    label: 'collectivité',
    pseudoIdField: '110',
    noticeType: 'c'
  },
  {
    label: 'œuvre',
    pseudoIdField: '141',
    noticeType: 't'
  },
  {
    label: 'œuvre',
    pseudoIdField: '144',
    noticeType: 'u'
  }
]

// Source: https://github.com/abes-esr/poc-fne/issues/203#issuecomment-526049026
const unimarc = [
  {
    label: 'œuvre',
    pseudoIdField: '100',
    pseudoIdSubfield: 'a',
    noticeType: [ 'Tu', 'Tq' ]
  },
  {
    label: 'collectivité',
    pseudoIdField: '100',
    noticeType: 'Tb'
  },
  {
    label: 'lieu',
    pseudoIdField: '100',
    noticeType: 'Tg'
  },
  {
    label: 'personne',
    pseudoIdField: '900',
    noticeType: 'Tp'
  }
]

const indexByNoticeTypes = (types) => {
  return types.reduce((obj, type) => {
    forceArray(type.noticeType).forEach((noticeType) => {
      obj[noticeType] = type
    })
    return obj
  }, {})
}

module.exports = {
  intermarc: indexByNoticeTypes(intermarc),
  unimarc: indexByNoticeTypes(unimarc)
}
