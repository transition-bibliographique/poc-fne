const createItemPseudoId = require('./create_item_pseudo_id')
const { getFirstField, findSchema } = require('./notice_helpers')
const parseGeneralNotice = require('./parse_general_notice')
const noticeTypes = require('./notice_types')
const pseudoIdField = noticeTypes.auteur_unimarc.marcPseudoIdField

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
      property: `${schema}_${noticeType}_${pseudoIdField}`,
      object: pepPseudoId
    })
  }

  return { items, relations }
}

const getPersonnePseudoId = notice => {
  const marcPseudoIdSubfield = noticeTypes.auteur_unimarc.marcPseudoIdSubfield
  const pepField = getFirstField(notice.datafield, pseudoIdField)
  return createItemPseudoId(pepField, marcPseudoIdSubfield)
}
