const { addLeaderClaims } = require('./claims')

module.exports = (schema, claims, leader) => {
  const { Pos: positions } = leader
  return addLeaderClaims(schema, claims, leader)
}
