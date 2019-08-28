const types = [
  {
    label: 'oeuvre',
    intermarcPseudoIdField: '145',
    intermarcNoticeType: 's'
  },
  {
    label: 'pep',
    intermarcPseudoIdField: '100',
    intermarcNoticeType: 'p'
  }
]

module.exports = types.reduce((obj, type) => {
  Object.keys(type).forEach(key => {
    const value = type[key]
    obj[value] = type
  })
  return obj
}, {})
