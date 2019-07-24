const { findNoticeType } = require('./notice_helpers')

module.exports = (notice) => {
  const { datafield: datafields, controlfield: controlfields, leader } = notice
  const typeKey = findNoticeType(leader)
  return noticeTypeParser[typeKey](notice)
}

const noticeTypeParser = {
  s: require('./parse_work_notice'),
  p: require('./parse_author_notice')
}
