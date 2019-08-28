const { findNoticeType, findSchema } = require('./notice_helpers')

module.exports = (notice) => {
  const schema = findSchema(notice)
  const noticeType = findNoticeType(notice, schema)
  return noticeTypeParser[noticeType](notice)
}

const noticeTypeParser = {
  s: require('./parse_intermarc_oeuvre_notice'),
  p: require('./parse_pep_notice'),
  Tu: require ('./parse_unimarc_oeuvre_notice')
}
