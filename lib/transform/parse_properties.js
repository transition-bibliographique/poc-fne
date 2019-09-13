const { buildSubfieldPseudoId, buildControlfieldPseudoId, buildLeaderPseudoId } = require('./build_pseudo_id')
const { findIntermarcNoticeType, buildModelizedPseudoId, findSchema } = require('./notice_helpers')
const { flatten } = require('lodash')

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
  const schema = findSchema(notice)
  const { datafield, controlfield } = notice
  const noticeType = findIntermarcNoticeType(notice)
  const datafieldProps = datafield.map(parseDatafield(noticeType, schema))
  const controlfieldProps = controlfield.map(parseControlField(schema))
  const leaderProps = buildLeaderPseudoId(schema)
  const props = [].concat(datafieldProps, controlfieldProps, leaderProps)
  return flatten(props)
}

const parseDatafield = (noticeType, schema) => (field, tagIndex) => {
  const { tag, subfields } = field
  if (tag === '031') {
    return buildModelizedPseudoId(schema, noticeType, tag)
  }
  return subfields.map((subfield, index) => {
    return buildSubfieldPseudoId(schema, subfield, index, tag, tagIndex)
  })
}

const parseControlField = (schema) => (field) => {
  return buildControlfieldPseudoId(schema, field.tag)
}
