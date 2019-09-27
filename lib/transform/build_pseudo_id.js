const buildSubfieldPseudoId = (schema, subfield, index, tag) => {
  return `${schema}_${tag}_${subfield.code}_${index}`
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
