const { buildPositionPseudoId } = require('./build_pseudo_id')
const { addPositionsClaims } = require('./claims')

module.exports = (schema, claims, controlfields) => {
  controlfields.map( field => {
    const { tag, Pos:positions } = field
    return addPositionsClaims(schema, claims, positions, tag)
  })
}
