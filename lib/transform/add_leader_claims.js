const { addLeaderClaims } = require('./claims')
const modelizedFieldParsers = require('./modelized_field_parsers')

module.exports = (schema, claims, leader) => {
  const schemaModelizedFieldParsers = modelizedFieldParsers[schema].leader
  if (schemaModelizedFieldParsers) {
    schemaModelizedFieldParsers(leader, claims)
  } else {
    addLeaderClaims(schema, claims, leader)
  }
}
