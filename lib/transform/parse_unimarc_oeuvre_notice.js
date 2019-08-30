const buildItemPseudoId = require('./build_item_pseudo_id')
const { getFirstField, findSchema } = require('./notice_helpers')
const parseGeneralNotice = require('./parse_general_notice')
const noticeTypes = require('./notice_types')
const personneTypes = noticeTypes.personne_unimarc
const personnePseudoId = personneTypes.pseudoIdFieldFromOeuvre
const personnePseudoIdSubfield = personneTypes.pseudoIdSubfieldFromOeuvre

module.exports = notice => {
  const schema = findSchema(notice)
  const { items, relations, noticeType } = parseGeneralNotice(notice, 'oeuvre_unimarc')
  const [ oeuvreItem ] = items

  const pepPseudoId = getPersonnePseudoId(notice)

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
      subject: oeuvreItem.pseudoId,
      property: `${schema}_${noticeType}_${personnePseudoId}`,
      object: pepPseudoId
    })
  }

  return { items, relations }
}

const getPersonnePseudoId = notice => {
  const pepField = getFirstField(notice.datafield, personnePseudoId)
  return buildItemPseudoId(pepField, personnePseudoIdSubfield)
}
