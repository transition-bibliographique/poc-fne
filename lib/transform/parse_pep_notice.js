const parseGeneralNotice = require('./parse_general_notice')

module.exports = notice => {
  return parseGeneralNotice(notice, 'pep')
}
