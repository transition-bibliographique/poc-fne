const { buildSubfieldPseudoId, buildPositionPseudoId } = require('./build_pseudo_id')
const { flatten } = require('lodash')
const schema = 'interxmarc'

module.exports = notice => {
  return parseFields(notice)
    .reduce((props, pseudoId) => {
      props[pseudoId] = {
        type: 'property',
        pseudoId,
        datatype: 'string',
        labels: {
          fr: pseudoId,
          en: pseudoId
        }
      }
      return props
    }, {})
}

const parseFields = notice => {
  const { datafield, controlfield, leader } = notice
  const datafieldProps = datafield.map(parseDataSubfields)
  const controlfieldProps = controlfield.map(parseControlSubfields)
  const leaderProps = parseLeader(leader)
  const props = [].concat(datafieldProps, controlfieldProps, leaderProps)
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
