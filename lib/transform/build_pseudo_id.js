const buildSubfieldPseudoId = (schema, subfield, index, tag, tagIndex) => {
  return `${schema}_${tag}_${tagIndex}_${subfield.code}_${index}`
}

const buildControlfieldPseudoId = (schema, tag) => {
  return `${schema}_${tag}`
}

const buildLeaderPseudoId = (schema) => {
  return `${schema}_leader`
}

module.exports = {
  buildSubfieldPseudoId,
  buildControlfieldPseudoId,
  buildLeaderPseudoId
}
