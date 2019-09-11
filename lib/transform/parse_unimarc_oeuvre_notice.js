const buildItemPseudoId = require('./build_item_pseudo_id')
const { getFirstField, findSchema } = require('./notice_helpers')
const parseGeneralNotice = require('./parse_general_notice')
const personnePseudoIdField = '440'
const personnePseudoIdSubfield = 'a'
const buildAuthorRelation = require('./build_author_relation')

module.exports = notice => {
  const schema = findSchema(notice)
  const { items, relations, noticeType } = parseGeneralNotice(notice)
  const [ oeuvreItem ] = items

  const personnePseudoId = getPersonnePseudoId(notice)

  if (personnePseudoId) {
    const { item: personneItem, relation } = buildAuthorRelation({
      oeuvrePseudoId: oeuvreItem.pseudoId,
      personnePseudoId: personnePseudoId,
      relationProperty: `${schema}_${noticeType}_${personnePseudoIdField}`
    })
    items.push(personneItem)
    relations.push(relation)
  }

  return { items, relations }
}

const getPersonnePseudoId = notice => {
  const pepField = getFirstField(notice.datafield, personnePseudoIdField)
  if (!pepField) return
  return buildItemPseudoId(pepField, personnePseudoIdSubfield)
}
