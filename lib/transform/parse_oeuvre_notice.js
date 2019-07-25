const schema = 'interxmarc'
const createItemPseudoId = require('./create_item_pseudo_id')
const addDatafieldClaims = require('./add_datafield_claims')
const addControlfieldClaims = require('./add_controlfield_claims')
const addLeaderClaims = require('./add_leader_claims')
const { addAlias, getFirstField } = require('./notice_helpers')
const pseudoIdField = require('./pseudo_id_field')
const noticeTypeCode = 's'

module.exports = notice => {
  const typeField = getFirstField(notice.datafield, pseudoIdField.oeuvre)
  const itemPseudoId = createItemPseudoId(typeField)

  const oeuvreItem = {
    pseudoId: itemPseudoId,
    labels: {},
    claims: {}
  }

  const { datafield: datafields, controlfield: controlfields, leader } = notice

  addDatafieldClaims(schema, oeuvreItem.claims, datafields)
  addControlfieldClaims(schema, oeuvreItem.claims, controlfields)
  addLeaderClaims(schema, oeuvreItem.claims, leader)
  addAlias(oeuvreItem.labels, itemPseudoId, 'en')
  addAlias(oeuvreItem.labels, itemPseudoId, 'fr')

  const items = [ oeuvreItem ]
  const relations = []

  const pepPseudoId = getPepPseudoId(notice)

  if (pepPseudoId) {
    const pepItem = {
      pseudoId: pepPseudoId,
      labels: {
        fr: pepPseudoId,
        en: pepPseudoId
      }
    }
    items.push(pepItem)
    relations.push({
      subject: itemPseudoId,
      property: `${schema}:${noticeTypeCode}:${pseudoIdField.pep}`,
      object: pepPseudoId
    })
  }

  return { items, relations }
}

const getPepPseudoId = notice => {
  const pepField = getFirstField(notice.datafield, pseudoIdField.pep)
  return createItemPseudoId(pepField)
}
