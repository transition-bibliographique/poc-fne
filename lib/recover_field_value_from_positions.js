module.exports = positions => {
  const stringArray = []
  positions.forEach(addPositionsValues(stringArray))
  var value = ''
  for (let i = 0; i < stringArray.length; i++) {
    value += stringArray[i] == null ? ' ' : stringArray[i]
  }
  return value
}

const parsePositionNumber = str => parseInt(str.replace(/^0/, ''))

const addPositionsValues = stringArray => ({ Code, $t }) => {
  var index = parsePositionNumber(Code.substring(0, 2))
  const valueArray = Array.from($t)
  while (valueArray.length > 0) {
    stringArray[index] = valueArray.shift()
    index++
  }
}
