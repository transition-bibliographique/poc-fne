const { buildSubfieldPseudoId, buildPositionPseudoId } = require('./build_pseudo_id')
const { findNoticeType } = require('./notice_helpers')
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
  const noticeType = findNoticeType(leader)
  const datafieldProps = datafield.map(parseDataField(noticeType))
  const controlfieldProps = controlfield.map(parseControlField)
  const leaderProps = parseLeader(leader)
  const props = [].concat(datafieldProps, controlfieldProps, leaderProps)
  return flatten(props)
}

const parseDataField = noticeType => field => {
  const { tag, subfields } = field
  if (tag === '031') {
    return buildModelizedPseudoId(tag, noticeType)
  }
  return subfields.map((subfield, index) => {
    return buildSubfieldPseudoId(schema, subfield, index, tag)
  })
}

const buildModelizedPseudoId = (tag, noticeType) => {
  return `${schema}:${noticeType}:${tag}`
}

const parseControlField = field => {
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
