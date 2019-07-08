const _ = require('lodash')

module.exports = subfield => {
  const { Pos:positionsAry } = subfield
  positions = _.keyBy(positionsAry, 'Code')
  monthAndDay = serialize0407(positions['0407'].$t)
  year = positions['0003'].$t
  return `${year}-${monthAndDay}`
}

const serialize0407 = (value) => {
  return value.slice(0, 2) + '-' + value.slice(2)
}