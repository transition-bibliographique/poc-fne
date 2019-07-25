const addAlias = (labels, itemPseudoId, lang) => {
  labels[lang] = itemPseudoId
}

const getFirstField = (fields, code) => {
  return fields.find(field => field.tag === code)
}

const findNoticeType = (leader) => {
  return leader.Pos.find((pos) => pos.Code === '09').$t
}

const buildModelizedPseudoId = (schema, noticeType, tag) => {
  return `${schema}:${noticeType}:${tag}`
}

module.exports = { addAlias, getFirstField, findNoticeType, buildModelizedPseudoId }
