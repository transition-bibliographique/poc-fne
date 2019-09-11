const { addLeaderClaims } = require('./claims')
const modelizedFieldParsers = require('./modelized_field_parsers')

module.exports = (schema, claims, leader, notice) => {
  const schemaModelizedFieldParsers = modelizedFieldParsers[schema].leader
  if (schemaModelizedFieldParsers) {
    schemaModelizedFieldParsers(leader, claims, notice)
  } else {
    addLeaderClaims(schema, claims, leader)
  }
}
