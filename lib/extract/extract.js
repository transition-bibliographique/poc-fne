const getNotices = require('./get_echantillon_data')
const parseNotice = require('./parse_record')
const sanitizeData = require('./sanitize_data')
const path = require('path')
const exportNdjsonNotices = require('./export_ndjson_notices')

module.exports = (xmlDumpPath) => {
  xmlDumpPath = path.resolve(xmlDumpPath)
  return getNotices(xmlDumpPath)
  .then(noticesData => {
    const sanitizedNotices = noticesData.map(extractNotice)
    return exportNdjsonNotices(xmlDumpPath, sanitizedNotices)
    .then(() => sanitizedNotices)
  })
}

const extractNotice = (recordData) => {
  const fields = parseNotice(recordData)
  return sanitizeData(fields)
}
