#!/usr/bin/env node
const path = require('path')
const extract = require('../lib/extract/extract')
const transformAndLoadNotice = require('../lib/transform_and_load_notice')

const noticesPaths = process.argv.slice(2)
  .filter(noticePath => noticePath.match(/\.txt$/))
  .map(noticePath => path.resolve(noticePath))

const getAndExtractNotice = (noticePath) => {
  const jsonNoticePath = noticePath.replace('.txt', '.json')
  try {
    const json = require(jsonNoticePath)
    console.log('already exist', jsonNoticePath)
    return Promise.resolve(json)
  } catch (err) {
    console.log('creating', noticePath)
    return extract(noticePath)
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

Promise.all(noticesPaths.map(getAndExtractNotice))
.then((notices) => {
  return Promise.all(notices.map(transformAndLoadNotice))
})
.then((responses) => {
  const idsMap = getIdsMap(responses)
  console.log('loaded', JSON.stringify(idsMap, null, 2))
})
.catch(console.error)
