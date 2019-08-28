const addAlias = (labels, itemPseudoId, lang) => {
  labels[lang] = itemPseudoId
}

const getFirstField = (fields, code) => {
  return fields.find(field => field.tag === code)
}

const findNoticeType = (notice, schema) => {
  if (schema === 'unimarc') {
    return findUnimarcNoticeType(notice)
  } else {
    return findIntermarcNoticeType(notice)
  }
}

const findUnimarcNoticeType = (notice) => {
  const field008 = getFirstField(notice.controlfield, '008')
  // Slice les deux premiers caractères car le chiffre que l'on trouve en controlfield 008 n'a pas d'importance dans le cadre du POC
  return field008.$t.slice(0,2)
}
const findIntermarcNoticeType = (notice) => { return notice.leader[9] }

const buildModelizedPseudoId = (schema, noticeType, tag) => {
  return `${schema}_${noticeType}_${tag}`
}

const findSchema = (notice) => {
  if (notice.format) { return 'intermarc' }
  return 'unimarc'
}

module.exports = { addAlias, getFirstField, findNoticeType, findIntermarcNoticeType, findUnimarcNoticeType, buildModelizedPseudoId, findSchema }
