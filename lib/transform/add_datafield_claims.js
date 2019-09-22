const { addSubfieldsClaims } = require('./claims')
const modelizedFieldParsers = require('./modelized_field_parsers')

module.exports = (schema, noticeType, claims, datafields) => {
  const schemaModelizedFieldParsers = modelizedFieldParsers[schema].datafield
  datafields.map((field, tagIndex) => {
    const { tag, subfields } = field
    const modelizedFieldParser = schemaModelizedFieldParsers[tag]
    const maxLength = 400
    subfields.map(trunctateSubfield(maxLength))
    if (modelizedFieldParser) {
      modelizedFieldParser(noticeType, tag, subfields, claims)
    } else {
      addSubfieldsClaims(schema, claims, subfields, tag, tagIndex)
    }
  })
}

const trunctateSubfield = (limit) => (subfield) => {
  // Il est convenu de tronquer les string qui posent problème. source: https://github.com/abes-esr/poc-fne/issues/217
  var { $t } = subfield
  if (subfield.$t.length > limit) subfield.$t = subfield.$t.slice(0, limit)
}
