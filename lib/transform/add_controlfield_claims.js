const { addControlfieldClaims } = require('./claims')

module.exports = (schema, claims, controlfields) => {
  controlfields.map(field => {
    const { tag, $t } = field
    return addControlfieldClaims(schema, claims, $t, tag)
  })
}
