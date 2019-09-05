const { findNoticeType, findSchema } = require('./notice_helpers')

module.exports = (notice) => {
  const schema = findSchema(notice)
  const noticeType = findNoticeType(notice, schema)
  return noticeTypeParser[schema][noticeType](notice)
}

const noticeTypeParser = {
  unimarc: {
    Tu: require ('./parse_unimarc_oeuvre_notice'),
    Tq: require ('./parse_unimarc_oeuvre_notice'),
    Tp: require ('./parse_unimarc_personne_notice')
  },
  intermarc: {
    s: require('./parse_intermarc_oeuvre_notice'),
    p: require ('./parse_intermarc_pep_notice')
  }
}
