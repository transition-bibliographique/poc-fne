const buildItemPseudoId = require('./build_item_pseudo_id')
const addDatafieldClaims = require('./add_datafield_claims')
const addControlfieldClaims = require('./add_controlfield_claims')
const addLeaderClaims = require('./add_leader_claims')
const { addAlias, getFirstField, findNoticeType, findSchema } = require('./notice_helpers')
const noticeTypes = require('./notice_types')
const error = require('../error')
const { keyBy } = require('lodash')

module.exports = (notice) => {
  const schema = findSchema(notice)
  const noticeType = findNoticeType(notice, schema)
  var { pseudoIdField, getPseudoIdField } = noticeTypes[schema][noticeType]
  if (!pseudoIdField) {
    const datafieldsByTags = keyBy(notice.datafield, 'tag')
    pseudoIdField = getPseudoIdField(datafieldsByTags)
  }
  if (!pseudoIdField) {
    const context = { noticeType, notice: notice.id }
    throw error.new('missing pseudoIdField', context)
  }
  const typeField = getFirstField(notice.datafield, pseudoIdField)
  if (!typeField) {
    const context = { pseudoIdField, noticeType, notice: notice.id }
    throw error.new('missing typeField', context)
  }
  const itemPseudoId = buildItemPseudoId(typeField)

  const mainItem = {
    pseudoId: itemPseudoId,
    labels: {},
    claims: {}
  }

  const { datafield: datafields, controlfield: controlfields, leader } = notice

  addDatafieldClaims(schema, noticeType, mainItem.claims, datafields)
  addControlfieldClaims(schema, noticeType, mainItem.claims, controlfields)
  addLeaderClaims(schema, mainItem.claims, leader, notice)
  addAlias(mainItem.labels, itemPseudoId, 'en')
  addAlias(mainItem.labels, itemPseudoId, 'fr')

  return { items: [ mainItem ], relations: [], noticeType }
}
