#!/usr/bin/env node
const path = require('path')
const extract = require('../lib/extract/extract')
const transformAndLoadNotice = require('../lib/transform_and_load_notice')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')
const getContextEntities = require('../lib/load/get_context_entities')
const loadItems = require('../lib/load/load_items')
const { readFile } = require('../lib/fs')
const { flatten } = require('lodash')
const { red } = require('chalk')

const noticesDumpPaths = process.argv.slice(2)
  .filter(noticesDumpPath => noticesDumpPath.match(/\.(xml|ndjson)$/))
  .map(noticesDumpPath => path.resolve(noticesDumpPath))

const getAndExtractNotices = (noticesDumpPath) => {
  const jsonNoticePath = noticesDumpPath.replace(/\.xml/, '.ndjson')

  return readFile(jsonNoticePath)
    .then(parseRecords(jsonNoticePath))
    .catch(extractIfMissing(noticesDumpPath, jsonNoticePath))
}

const parseRecords = (jsonNoticePath) => (buf) => {
  const ndjson = buf.toString().trim()
  const lines = ndjson.split('\n')
  console.log(jsonNoticePath, 'number of records:', lines.length)
  return lines.map(JSON.parse)
}

const extractIfMissing = (noticesDumpPath, jsonNoticePath) => (err) => {
  if (err.code !== 'ENOENT') {
    throw err
  } else {
    console.log('creating', jsonNoticePath)
    return extract(noticesDumpPath)
  }
}

const transformNotice = (notice) => {
  try {
    const properties = parseProperties(notice)
    const { items, relations } = parseNotice(notice)
    return { items, relations, properties }
  } catch (err) {
    return { error: err }
  }
}

const transformNotices = (notices) => {
  const { items, relations, properties, errors } = notices
    .map(transformNotice)
    .reduce(aggregateTransformResults, {
      items: [],
      relations: [],
      properties: {},
      errors: []
    })

  if (errors.length > 0) {
    errors.forEach((err) => {
      console.error(red(err.message), JSON.stringify(err.context, null, 2))
    })
    throw new Error('there are transform errors')
  } else {
    console.log('no transform errors')
    return { items, relations, properties }
  }
}

const aggregateTransformResults = (results, nextResult) => {
  if (nextResult.error) {
    results.errors.push(nextResult.error)
  } else {
    results.items.push(...nextResult.items)
    results.relations.push(...nextResult.relations)
    Object.assign(results.properties, nextResult.properties)
  }
  return results
}

const loadNotices = ({ items, relations, properties }) => {
  return getContextEntities(properties)
    .then((contextEntities) => loadItems(items, relations, contextEntities))
}

const getIdsMap = (res) => {
  return Object.values(res.entities).reduce((idsMap, entity) => {
    idsMap[entity.id] = entity.labels.en.value
    return idsMap
  }, {})
}

Promise.all(noticesDumpPaths.map(getAndExtractNotices))
.then(flatten)
.then(transformNotices)
.then(loadNotices)
.then((res) => {
  const idsMap = getIdsMap(res)
  console.log('loaded', JSON.stringify(idsMap, null, 2))
})
.catch(console.error)
