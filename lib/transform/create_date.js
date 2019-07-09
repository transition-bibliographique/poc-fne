const _ = require('lodash')

module.exports = subfield => {
  const { Pos: positionsAry } = subfield
  const positions = _.keyBy(positionsAry, 'Code')
  const monthAndDay = serialize0407(positions['0407'].$t)
  const year = positions['0003'].$t
  return `${year}-${monthAndDay}`
}

const serialize0407 = (value) => {
  return value.slice(0, 2) + '-' + value.slice(2)
}
