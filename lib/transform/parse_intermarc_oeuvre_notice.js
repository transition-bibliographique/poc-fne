const schema = 'intermarc'
const buildItemPseudoId = require('./build_item_pseudo_id')
const { getFirstField, findSchema } = require('./notice_helpers')
const parseGeneralNotice = require('./parse_general_notice')
const noticeTypes = require('./notice_types')
const { pseudoIdField } = noticeTypes.pep_intermarc
const buildAuthorRelation = require('./build_author_relation')

module.exports = notice => {
  const schema = findSchema(notice)
  const { items, relations, noticeType } = parseGeneralNotice(notice)
  const [ oeuvreItem ] = items

  const pepPseudoId = getPepPseudoId(notice)

  if (pepPseudoId) {
    const { item: pepItem, relation } = buildAuthorRelation({
      oeuvrePseudoId: oeuvreItem.pseudoId,
      personnePseudoId: pepPseudoId,
      relationProperty: `${schema}_${noticeType}_${pseudoIdField}`
    })
    items.push(pepItem)
    relations.push(relation)
  }

  return { items, relations }
}

const getPepPseudoId = notice => {
  const pepField = getFirstField(notice.datafield, pseudoIdField)
  if (!pepField) return
  return buildItemPseudoId(pepField)
}
