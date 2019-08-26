const buildSubfieldPseudoId = (schema, subfield, index, tag) => {
  return `${schema}:${tag}:${subfield.code}:${index}`
}

const buildPositionPseudoId = (schema, tag, position) => {
  return `${schema}:${tag}:${position.Code}`
}

module.exports = {
  buildSubfieldPseudoId,
  buildPositionPseudoId
}
