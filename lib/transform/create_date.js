const _ = require('lodash')

module.exports = subfield => {
  if (subfield.$t) { return subfield.$t }
  return positionSubfield(subfield)
}

const positionSubfield = (subfield) => {
  const { Pos: positionsAry } = subfield
  const positions = _.keyBy(positionsAry, 'Code')


  const monthAndDay = serialize(positions, '0407')
  const year = serialize(positions, '0003')
  return `${year}-${monthAndDay}`
}

const serialize = (positions, index) => {
  if (index === '0407' ) {
    return getPositionRange(positions, index)
  }
  if (index === '0003' ) {
    return positions[index].$t
  }
}

const getPositionRange = (positions, index) => {
  value = positions[index].$t
  return value.slice(0, 2) + '-' + value.slice(2)

}
