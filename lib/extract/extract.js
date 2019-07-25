const getEchantillonData = require('./get_echantillon_data')
const parseRecord = require('./parse_record')
const sanitizeData = require('./sanitize_data')
const path = require('path')
const exportJsonNotice = require('./export_json_notice')

module.exports = (noticePath) => {
  noticePath = path.resolve(noticePath)
  return getEchantillonData(noticePath)
  .then(data => {
    const fields = parseRecord(data)
    const noticeJsonData = sanitizeData(fields)
    return exportJsonNotice(noticePath, noticeJsonData)
    .then(() => noticeJsonData)
  })
}
