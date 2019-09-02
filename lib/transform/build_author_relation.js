module.exports = (oeuvrePseudoId, personnePseudoId, relationProperty) => {
  const item = {
    pseudoId: personnePseudoId,
    labels: {
      fr: personnePseudoId,
      en: personnePseudoId
    }
  }
  const relation = {
    subject: oeuvreItem.pseudoId,
    property: `${schema}_${noticeType}_${pseudoIdField}`,
    object: personnePseudoId
  }
  return { item, relation }
}
