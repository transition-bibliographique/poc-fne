const schema = 'interxmarc'
const createItemPseudoId = require('./create_item_pseudo_id')
const addDatafieldClaims = require('./add_datafield_claims')
const addControlfieldClaims = require('./add_controlfield_claims')
const addLeaderClaims = require('./add_leader_claims')

module.exports = notice => {
  const { datafield: datafields, controlfield: controlfields, leader } = notice
  const noticeType = leader.Pos.find((pos) => pos.Code === '09' ).$t
  const typeFieldKey = typeFieldByNoticeType[noticeType]
  const typeField = getFirstField(datafields, typeFieldKey)

  const itemPseudoId = createItemPseudoId(typeField)

  const item = {
    pseudoId: itemPseudoId,
    labels: {},
    claims: {}
  }

  addDatafieldClaims(schema, item.claims, datafields)
  addControlfieldClaims(schema, item.claims, controlfields)
  addLeaderClaims(schema, item.claims, leader)
  addLabel(item.labels, itemPseudoId, 'en')
  addLabel(item.labels, itemPseudoId, 'fr')

  return [ item ]
}

const typeFieldByNoticeType = {
  s: '145',
  t: '100'
}

const addLabel = (labels, itemPseudoId, lang) => {
  labels[lang] = itemPseudoId
}

const getFirstField = (fields, code) => {
  const fieldsByCode = getFields(fields, code)
  return fieldsByCode[0]
}
const getFields = (fields, code) => {
  return fields.filter(field => field.tag === code)
}
