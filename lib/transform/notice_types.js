const types = [
  {
    label: 'oeuvre',
    interxmarcPseudoIdField: '145',
    interxmarcNoticeType: 's'
  },
  {
    label: 'pep',
    interxmarcPseudoIdField: '100',
    interxmarcNoticeType: 'p'
  }
]

module.exports = types.reduce((obj, type) => {
  Object.keys(type).forEach(key => {
    const value = type[key]
    obj[value] = type
  })
  return obj
}, {})
