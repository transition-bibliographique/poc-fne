const { addControlfieldClaims } = require('./claims')
const modelizedFieldParsers = require('./modelized_field_parsers')

module.exports = (schema, noticeType, claims, controlfields) => {
  const schemaModelizedFieldParsers = modelizedFieldParsers[schema].controlfield
  controlfields.map(field => {
    const { tag, $t } = field
    const modelizedFieldParser = schemaModelizedFieldParsers[tag]
    if (modelizedFieldParser) {
      modelizedFieldParser(schema, noticeType, tag, $t, claims)
    } else {
      addControlfieldClaims(schema, claims, $t, tag)
    }
  })
}
