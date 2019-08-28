const types = [
  {
    label: 'oeuvre_intermarc',
    marcPseudoIdField: '145',
    intermarcNoticeType: 's'
  },
  {
    label: 'oeuvre_unimarc',
    marcPseudoIdField: '100',
    marcPseudoIdSubfield: 'a',
    unimarcNoticeType: 'Tu'
  },
  {
    label: 'pep',
    marcPseudoIdField: '100',
    intermarcNoticeType: 'p'
  },
  {
    label: 'auteur_unimarc',
    marcPseudoIdField: '440',
    marcPseudoIdSubfield: 'a'
  }
]

module.exports = types.reduce((obj, type) => {
  Object.keys(type).forEach(key => {
    const value = type[key]
    obj[value] = type
  })
  return obj
}, {})
