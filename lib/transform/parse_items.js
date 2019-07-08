const schema = 'interxmarc'
const createItemPseudoId = require('./create_item_pseudo_id')
const addDatafieldClaims = require('./add_datafield_claims')

module.exports = notice => {
  const datafields = notice.datafield

  const field100 = getFirstField(datafields, '100')
  const itemPseudoId = createItemPseudoId(field100)

  const item = {
    id: itemPseudoId,
    aliases: {},
    claims: {}
  }

  addDatafieldClaims(schema, item.claims, datafields)
  addAlias(item.aliases, itemPseudoId, 'fr')

  return item
}

const addAlias = (aliases, itemPseudoId, lang) => {
  aliases[lang] = itemPseudoId
}

const getFirstField = (fields, code) => {
  fields = getFields(fields, code)
  return fields[0]
}
const getFields = (fields, code) => {
  filteredFields = fields.filter(field => field.tag == code )
  return filteredFields
}
