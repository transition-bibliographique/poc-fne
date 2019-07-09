const { buildDatafieldPseudoId, buildControlfieldPseudoId } = require('./build_pseudo_id')
const { flatten } = require('lodash')
const schema = 'interxmarc'

module.exports = notice => {
  return parseFields(notice)
  .reduce((obj, id) => {
    obj[id] = { id, datatype: 'string', aliases: { fr: id } }
    return obj
  }, {})
}

const parseFields = notice => {
  const { datafield, controlfield } = notice
  props = []
  datafieldProps = datafield.map(parseDataSubfields)
  controlfieldProps = controlfield.map(parseControlSubfields)

  props.push(...datafieldProps)
  props.push(...controlfieldProps)
  return flatten(props)
}

const parseDataSubfields = field => {
  const { tag, subfields } = field
  return subfields.map((subfield, index) => {
    return buildDatafieldPseudoId(schema, subfield, index, tag)
  })
}

const parseControlSubfields = field => {
  const { tag, Pos:positions } = field
  return positions.map((position) => {
    return buildControlfieldPseudoId(schema, tag, position)
  })
}
