const { addSubfieldsClaims } = require('./claims')

module.exports = (schema, claims, datafields) => {
  datafields.map(field => {
    const { tag, subfields } = field
    addSubfieldsClaims(schema, claims, subfields, tag)
  })
}
