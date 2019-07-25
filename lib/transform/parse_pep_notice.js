const schema = 'interxmarc'
const createItemPseudoId = require('./create_item_pseudo_id')
const addDatafieldClaims = require('./add_datafield_claims')
const addControlfieldClaims = require('./add_controlfield_claims')
const addLeaderClaims = require('./add_leader_claims')
const { addAlias, getFirstField } = require('./notice_helpers')
const pseudoIdField = require('./pseudo_id_field')

module.exports = notice => {
  const typeField = getFirstField(notice.datafield, pseudoIdField.pep)
  const itemPseudoId = createItemPseudoId(typeField)

  const authorItem = {
    pseudoId: itemPseudoId,
    labels: {},
    claims: {}
  }

  const { datafield: datafields, controlfield: controlfields, leader } = notice

  addDatafieldClaims(schema, authorItem.claims, datafields)
  addControlfieldClaims(schema, authorItem.claims, controlfields)
  addLeaderClaims(schema, authorItem.claims, leader)
  addAlias(authorItem.labels, itemPseudoId, 'en')
  addAlias(authorItem.labels, itemPseudoId, 'fr')

  return { items: [ authorItem ], relations: [] }
}
