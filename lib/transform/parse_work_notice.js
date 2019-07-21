const schema = 'interxmarc'
const createItemPseudoId = require('./create_item_pseudo_id')
const addDatafieldClaims = require('./add_datafield_claims')
const addControlfieldClaims = require('./add_controlfield_claims')
const addLeaderClaims = require('./add_leader_claims')
const { addAlias, getFirstField } = require('./notice_helpers')
const pseudoIdField = require('./pseudo_id_field')

module.exports = notice => {
  const typeField = getFirstField(notice.datafield, pseudoIdField.work)
  const itemPseudoId = createItemPseudoId(typeField)

  const workItem = {
    pseudoId: itemPseudoId,
    labels: {},
    claims: {}
  }

  const { datafield: datafields, controlfield: controlfields, leader } = notice

  addDatafieldClaims(schema, workItem.claims, datafields)
  addControlfieldClaims(schema, workItem.claims, controlfields)
  addLeaderClaims(schema, workItem.claims, leader)
  addAlias(workItem.labels, itemPseudoId, 'en')
  addAlias(workItem.labels, itemPseudoId, 'fr')

  const items = [ workItem ]
  const relations = []

  const authorPseudoId = getAuthorPseudoId(notice)

  if (authorPseudoId) {
    const authorItem = {
      pseudoId: authorPseudoId,
      labels: {
        fr: authorPseudoId,
        en: authorPseudoId
      }
    }
    items.push(authorItem)
    relations.push({ subject: itemPseudoId, property: 'author', object: authorPseudoId })
  }

  return { items, relations }
}

const getAuthorPseudoId = notice => {
  const authorField = getFirstField(notice.datafield, pseudoIdField.author)
  return createItemPseudoId(authorField)
}
