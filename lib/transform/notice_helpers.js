const addAlias = (labels, itemPseudoId, lang) => {
  labels[lang] = itemPseudoId
}

const getFirstField = (fields, code) => {
  return fields.find(field => field.tag === code)
}

const findNoticeType = (leader) => {
  return leader.Pos.find((pos) => pos.Code === '09').$t
}

module.exports = { addAlias, getFirstField, findNoticeType }
