#!/usr/bin/env node
const path = require('path')
const extract = require('../lib/extract/extract')
const transformAndLoadNotice = require('../lib/transform_and_load_notice')
const { readFile } = require('../lib/fs')
const { flatten } = require('lodash')

const noticesDumpPaths = process.argv.slice(2)
  .filter(noticesDumpPath => noticesDumpPath.match(/\.xml$/))
  .map(noticesDumpPath => path.resolve(noticesDumpPath))

const getAndExtractNotices = (noticesDumpPath) => {
  const jsonNoticePath = noticesDumpPath.replace(/\.xml/, '.ndjson')
  return readFile(jsonNoticePath)
    .then(parseRecords(jsonNoticePath))
    .catch(extractIfMissing(noticesDumpPath, jsonNoticePath))
}

const parseRecords = (jsonNoticePath) => (buf) => {
  console.log('already exist', jsonNoticePath)
  const ndjson = buf.toString()
  return ndjson
    .split('\n')
    .map(JSON.parse)
}

const extractIfMissing = (noticesDumpPath, jsonNoticePath) => (err) => {
  if (err.code !== 'ENOENT') {
    throw err
  } else {
    console.log('creating', jsonNoticePath)
    return extract(noticesDumpPath)
  }
}

const getIdsMap = (responses) => {
  return responses.reduce((obj, res) => {
    Object.keys(res.entities).forEach(entityId => {
      const pseudoId = res.entities[entityId].labels.en.value
      obj[entityId] = pseudoId
    })
    return obj
  }, {})
}

Promise.all(noticesDumpPaths.map(getAndExtractNotices))
.then(flatten)
.then((notices) => {
  return Promise.all(notices.map(transformAndLoadNotice))
})
.then((responses) => {
  const idsMap = getIdsMap(responses)
  console.log('loaded', JSON.stringify(idsMap, null, 2))
})
.catch(console.error)
