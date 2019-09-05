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
    // Dropping prefixes found in BNF intermarc notices, to align with ABES marc,
    // and those were lost downstream anyway
    .replace(/srw:/g, '')
    .replace(/mxc:/g, '')
    .split('<record>')
    // Drop the header before the first record
    .slice(1)
    .map(cleanupNotice)
}

const cleanupNotice = (xmlNotice) => {
  // Drop end of file tags, only useful for the last record
  const xmlNoticeContent = xmlNotice.split('</record>')[0]
  return `${xmlHeader} <record>${xmlNoticeContent}</record>`
}

const xmlNoticeToObject = (xmlNotice) => {
  const json = parser.toJson(xmlNotice)
  return JSON.parse(json)
}
