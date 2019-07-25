#!/usr/bin/env node
const path = require('path')
const extract = require('../lib/extract/extract')
const transformAndLoadNotice = require('../lib/transform_and_load_notice')

const noticesPaths = process.argv.slice(2)
  .filter(noticePath => noticePath.match(/\.txt$/))
  .map(noticePath => path.resolve(noticePath))

const getNoticeJson = (noticePath) => {
  const jsonNoticePath = noticePath.replace('.txt', '.json')
  try {
    const json = require(jsonNoticePath)
    console.log('already exist', noticePath)
    return Promise.resolve(json)
  } catch (err) {
    console.log('creating', noticePath)
    return extract(noticePath)
  }
}

Promise.all(noticesPaths.map(getNoticeJson))
.then((notices) => {
  return Promise.all(notices.map(transformAndLoadNotice))
})
.then((res) => { console.log('loaded', res) })
.catch(console.error)
