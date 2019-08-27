const addAlias = (labels, itemPseudoId, lang) => {
  labels[lang] = itemPseudoId
}

const getFirstField = (fields, code) => {
  return fields.find(field => field.tag === code)
}

const findNoticeType = (leader) => { return leader[9] }

const buildModelizedPseudoId = (schema, noticeType, tag) => {
  return `${schema}_${noticeType}_${tag}`
}

module.exports = { addAlias, getFirstField, findNoticeType, buildModelizedPseudoId }
