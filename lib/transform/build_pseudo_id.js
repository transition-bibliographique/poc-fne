buildSubfieldPseudoId = (schema, subfield, index, tag) => {
  return `${schema}:${tag}:${subfield.code}:${index}`
}

buildPositionPseudoId = (schema, tag, position) => {
  return `${schema}:${tag}:${position.Code}`
}

module.exports = {
  buildSubfieldPseudoId,
  buildPositionPseudoId
}

