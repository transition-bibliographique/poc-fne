const schema = 'interxmarc'
const createItemPseudoId = require('./create_item_pseudo_id')
const { getFirstField } = require('./notice_helpers')
const parseGeneralNotice = require('./parse_general_notice')
const noticeTypes = require('./notice_types')
const pepPseudoIdField = noticeTypes.pep.interxmarcPseudoIdField

module.exports = notice => {
  const { items, relations, noticeType } = parseGeneralNotice(notice, 'oeuvre')
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
      property: `${schema}:${noticeType}:${pepPseudoIdField}`,
      object: pepPseudoId
    })
  }

  return { items, relations }
}

const getPepPseudoId = notice => {
  const pepField = getFirstField(notice.datafield, pepPseudoIdField)
  return createItemPseudoId(pepField)
}
