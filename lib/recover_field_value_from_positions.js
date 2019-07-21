module.exports = positions => {
  const stringArray = Array(100).fill(' ')
  positions.forEach(addPositionsValues(stringArray))
  return trimEnd(stringArray.join(''))
}

const addPositionsValues = stringArray => ({ Code, $t }) => {
  var index = parseInt(Code.substring(0, 2))
  Array.from($t).forEach(character => {
    stringArray[index] = character
    index++
  })
}

const trimEnd = str => str.replace(/\s+$/, '')
