const buildItemPseudoId = require('./build_item_pseudo_id')
const { getFirstField, findSchema } = require('./notice_helpers')
const parseGeneralNotice = require('./parse_general_notice')
const noticeTypes = require('./notice_types')
const personneTypes = noticeTypes.personne_unimarc
const personnePseudoIdField = personneTypes.pseudoIdFieldFromOeuvre
const personnePseudoIdSubfield = personneTypes.pseudoIdSubfieldFromOeuvre
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
