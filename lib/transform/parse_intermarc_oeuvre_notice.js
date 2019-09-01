const schema = 'intermarc'
const buildItemPseudoId = require('./build_item_pseudo_id')
const { getFirstField } = require('./notice_helpers')
const parseGeneralNotice = require('./parse_general_notice')
const noticeTypes = require('./notice_types')
const { pseudoIdField } = noticeTypes.pep_intermarc

module.exports = notice => {
  const { items, relations, noticeType } = parseGeneralNotice(notice)
  const [ oeuvreItem ] = items

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
      subject: oeuvreItem.pseudoId,
      property: `${schema}_${noticeType}_${pseudoIdField}`,
      object: pepPseudoId
    })
  }

  return { items, relations }
}

const getPepPseudoId = notice => {
  const pepField = getFirstField(notice.datafield, pseudoIdField)
  return buildItemPseudoId(pepField)
}
