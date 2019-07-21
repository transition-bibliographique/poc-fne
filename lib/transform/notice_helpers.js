const addAlias = (labels, itemPseudoId, lang) => {
  labels[lang] = itemPseudoId
}

const getFirstField = (fields, code) => {
  return fields.find(field => field.tag === code)
}

module.exports = { addAlias, getFirstField }
