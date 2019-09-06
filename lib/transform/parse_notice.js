const { findNoticeType, findSchema } = require('./notice_helpers')
const parseGeneralNotice = require('./parse_general_notice')

module.exports = (notice) => {
  const schema = findSchema(notice)
  const noticeType = findNoticeType(notice, schema)
  const parser = specificParser[schema][noticeType] || parseGeneralNotice
  return parser(notice)
}

const specificParser = {
  unimarc: {
    Tu: require('./parse_unimarc_oeuvre_notice'),
    Tq: require('./parse_unimarc_oeuvre_notice')
  },
  intermarc: {
    s: require('./parse_intermarc_oeuvre_notice')
  }
}
