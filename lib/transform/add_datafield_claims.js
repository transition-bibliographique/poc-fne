const { addSubfieldsClaims } = require('./claims')
const modelizedFieldParsers = require('./modelized_field_parsers')

module.exports = (schema, noticeType, claims, datafields) => {
  const schemaModelizedFieldParsers = modelizedFieldParsers[schema].datafield
  datafields.map((field, tagIndex) => {
    const { tag, subfields } = field
    const modelizedFieldParser = schemaModelizedFieldParsers[tag]
    if (modelizedFieldParser) {
      modelizedFieldParser(noticeType, tag, subfields, claims)
    } else {
      addSubfieldsClaims(schema, claims, subfields, tag, tagIndex)
    }
  })
}
