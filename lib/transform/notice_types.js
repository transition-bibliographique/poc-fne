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
    unimarcNoticeType: [ 'Tu', 'Tq' ]
  },
  {
    label: 'pep_intermarc',
    pseudoIdField: '100',
    intermarcNoticeType: 'p'
  },
  {
    label: 'nom_commun_intermarc',
    pseudoIdField: '166',
    intermarcNoticeType: 'm'
  },
  {
    label: 'nom_geo_intermarc',
    pseudoIdField: '170',
    intermarcNoticeType: 'l'
  },
  {
    label: 'default_unimarc',
    pseudoIdField: '100',
    unimarcNoticeType: [ 'Tb', 'Tg' ]
  },
  {
    label: 'default_intermarc',
    pseudoIdField: '110',
    intermarcNoticeType: [ 'c', 'u', 't']
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
    if (value instanceof Array) {
      value.forEach((subvalue) => obj[subvalue] = type)
    } else {
      obj[value] = type
    }
  })
  return obj
}, {})
