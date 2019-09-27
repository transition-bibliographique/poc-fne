module.exports = (args) => {
  const { oeuvrePseudoId, personnePseudoId, relationProperty } = args
  const item = {
    pseudoId: personnePseudoId,
    labels: {
      fr: personnePseudoId,
      en: personnePseudoId
    }
  }
  const relation = {
    subject: oeuvrePseudoId,
    property: relationProperty,
    object: personnePseudoId
  }
  return { item, relation }
}
