const { buildControlfieldPseudoId } = require('./build_pseudo_id')
const addClaim = require('./add_claim')

module.exports = (schema, claims, controlfields) => {
  controlfields.map( field => { addClaims(schema, claims, field) })
}

const addClaims = (schema, claims, field) => {
  const { tag, Pos:positions } = field
  positions.map((position) => {
    const pseudoPropertyId = buildControlfieldPseudoId(schema, tag, position)
    value = position.$t
    addClaim(claims, pseudoPropertyId, value)
  })
}
