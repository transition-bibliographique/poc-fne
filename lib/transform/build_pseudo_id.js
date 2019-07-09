buildDatafieldPseudoId = (schema, subfield, index, tag) => {
  return `${schema}:${tag}:${subfield.code}:${index}`
}

buildControlfieldPseudoId = (schema, tag, position) => {
  return `${schema}:${tag}:${position.Code}`
}

module.exports = {
  buildDatafieldPseudoId: buildDatafieldPseudoId,
  buildControlfieldPseudoId: buildControlfieldPseudoId
}

