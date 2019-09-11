const { forceArray } = require('../utils')

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
      // See https://github.com/abes-esr/poc-fne/issues/201#issuecomment-527909016
      if (datafieldsByTags['166'] || datafieldsByTags['466']) return 'concept'
      if (datafieldsByTags['167'] || datafieldsByTags['467']) return 'lieu'
    },
    noticeType: 'm',
    getPseudoIdField: (datafieldsByTags) => {
      if (datafieldsByTags['166']) return '166'
      if (datafieldsByTags['167']) return '167'
      if (datafieldsByTags['466']) return '466'
      if (datafieldsByTags['467']) return '467'
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
    pseudoIdField: '110',
    noticeType: [ 't', 'u' ]
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
