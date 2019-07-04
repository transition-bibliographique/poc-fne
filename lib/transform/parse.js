const { flatten } = require('lodash')

module.exports = notice => flatten(parseFields(notice))

const parseFields = notice => notice.datafield.map(parseSubfields)

const parseSubfields = field => {
  const { tag, subfield: subfields } = field
  return forceArray(subfields)
  .map(subfield => `${tag} ${subfield.code}`)
}

const forceArray = obj => obj instanceof Array ? obj : [ obj ]
