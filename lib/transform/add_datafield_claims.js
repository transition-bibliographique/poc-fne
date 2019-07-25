const { addSubfieldsClaims } = require('./claims')
const modelizedFieldParsers = require('./modelized_field_parsers')

module.exports = (schema, noticeType, claims, datafields) => {
  datafields.map(field => {
    const { tag, subfields } = field
    const modelizedFieldParser = modelizedFieldParsers[tag]
    if (modelizedFieldParser) {
      modelizedFieldParser(schema, noticeType, tag, subfields, claims)
    } else {
      addSubfieldsClaims(schema, claims, subfields, tag)
    }
  })
}
