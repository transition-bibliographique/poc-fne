const { readFile } = require('../fs')
const parser = require('xml2json')
const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'

module.exports = filePath => {
  return readFile(filePath)
    .then(buffer => buffer.toString())
    .then(splitNotices)
    .then((xmlNotices) => xmlNotices.map(xmlNoticeToObject))
}

const splitNotices = (xmlDump) => {
  return xmlDump
    .split('<srw:record>')
    // Drop the header before the first record
    .slice(1)
    .map(cleanupNotice)
}

const cleanupNotice = (xmlNotice) => {
  // Drop end of file tags, only useful for the last record
  const xmlNoticeContent = xmlNotice.split('</srw:record>')[0]
  return `${xmlHeader} <srw:record>${xmlNoticeContent}</srw:record>`
}

const xmlNoticeToObject = (xmlNotice) => {
  const json = parser.toJson(xmlNotice)
  return JSON.parse(json)
}
