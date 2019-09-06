const { findNoticeType, findSchema } = require('./notice_helpers')

module.exports = (notice) => {
  const schema = findSchema(notice)
  const noticeType = findNoticeType(notice, schema)
  const parser = noticeTypeParser[schema][noticeType]
  if (!parser) return console.log("Unable to find notice parser for : ", noticeType)
  return parser(notice)
}

const noticeTypeParser = {
  unimarc: {
    Tu: require ('./parse_unimarc_oeuvre_notice'),
    Tq: require ('./parse_unimarc_oeuvre_notice'),
    Tp: require ('./parse_unimarc_personne_notice'),
    Tb: require ('./parse_general_notice'),
    Tg: require ('./parse_general_notice')
  },
  intermarc: {
    s: require('./parse_intermarc_oeuvre_notice'),
    p: require ('./parse_intermarc_pep_notice'),
    c: require('./parse_general_notice'),
    m: require('./parse_general_notice'),
    l: require('./parse_general_notice'),
    u: require('./parse_general_notice'),
    t: require('./parse_general_notice')
  }
}
