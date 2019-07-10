const { buildSubfieldPseudoId, buildPositionPseudoId } = require('./build_pseudo_id')
const { flatten } = require('lodash')
const schema = 'interxmarc'

module.exports = notice => {
  return parseFields(notice)
    .reduce((obj, pseudoId) => {
      obj[pseudoId] = {
        type: 'property',
        pseudoId,
        datatype: 'string',
        labels: {
          en: pseudoId,
          fr: pseudoId
        }
      }
      return obj
    }, {})
}

const parseFields = notice => {
  const { datafield, controlfield, leader } = notice
  const props = []
  const datafieldProps = datafield.map(parseDataSubfields)
  const controlfieldProps = controlfield.map(parseControlSubfields)
  const leaderProps = parseLeader(leader)

  props.push(...datafieldProps)
  props.push(...controlfieldProps)
  props.push(...leaderProps)
  return flatten(props)
}

const parseDataSubfields = field => {
  const { tag, subfields } = field
  return subfields.map((subfield, index) => {
    return buildSubfieldPseudoId(schema, subfield, index, tag)
  })
}

const parseControlSubfields = field => {
  const { tag, Pos: positions } = field
  return positions.map((position) => {
    return buildPositionPseudoId(schema, tag, position)
  })
}

const parseLeader = leader => {
  const { Pos: positions } = leader
  return positions.map((position) => {
    return buildPositionPseudoId(schema, '000', position)
  })
}
