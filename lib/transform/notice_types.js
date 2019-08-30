const types = [
  {
    label: 'oeuvre_intermarc',
    pseudoIdField: '145',
    intermarcNoticeType: 's'
  },
  {
    label: 'oeuvre_unimarc',
    pseudoIdField: '100',
    pseudoIdSubfield: 'a',
    unimarcNoticeType: 'Tu'
  },
  {
    label: 'pep_intermarc',
    pseudoIdField: '100',
    intermarcNoticeType: 'p'
  },
  {
    label: 'personne_unimarc',
    pseudoIdField: '900',
    pseudoIdFieldFromOeuvre: '440',
    pseudoIdSubfieldFromOeuvre: 'a',
    unimarcNoticeType: 'Tp'
  }
]

module.exports = types.reduce((obj, type) => {
  Object.keys(type).forEach(key => {
    const value = type[key]
    obj[value] = type
  })
  return obj
}, {})
