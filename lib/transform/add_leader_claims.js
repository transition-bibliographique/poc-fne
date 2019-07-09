const { buildPositionPseudoId } = require('./build_pseudo_id')
const { addPositionsClaims } = require('./claims')

module.exports = (schema, claims, leader) => {
  const { Pos:positions } = leader
  return addPositionsClaims(schema, claims, positions, '000')
}
