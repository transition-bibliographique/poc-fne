const { buildSubfieldPseudoId, buildControlfieldPseudoId, buildLeaderPseudoId } = require('./build_pseudo_id')
const { findNoticeType, buildModelizedPseudoId } = require('./notice_helpers')
const { flatten } = require('lodash')
const schema = 'intermarc'

module.exports = (notice) => {
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

const parseFields = (notice) => {
  const { datafield, controlfield, leader } = notice
  const noticeType = findNoticeType(leader)
  const datafieldProps = datafield.map(parseDatafield(noticeType))
  const controlfieldProps = controlfield.map(parseControlField)
  const leaderProps = parseLeader(leader)
  const props = [].concat(datafieldProps, controlfieldProps, leaderProps)
  return flatten(props)
}

const parseDatafield = (noticeType) => (field) => {
  const { tag, subfields } = field
  if (tag === '031') {
    return buildModelizedPseudoId(schema, noticeType, tag)
  }
  return subfields.map((subfield, index) => {
    return buildSubfieldPseudoId(schema, subfield, index, tag)
  })
}

const parseControlField = (field) => {
  return buildControlfieldPseudoId(schema, field.tag)
}

const parseLeader = (leader) => {
  return buildLeaderPseudoId(schema)
}
