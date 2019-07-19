#!/usr/bin/env node
const getEchantillonData = require('../lib/extract/get_echantillon_data')
const parseRecord = require('../lib/extract/parse_record')
const sanitizeData = require('../lib/extract/sanitize_data')
const path = require('path')
const fs = require('fs')

// ie: `npm run extract echantillons/RobertFleming_BnF_14797579.txt`
const fileName = process.argv[2]
const filePath = path.join(__dirname, '..', fileName)

const data = getEchantillonData(filePath)
const fields = parseRecord(data)
const sanitizeFields = sanitizeData(fields)
const json = JSON.stringify(sanitizeFields, null, 2)

const jsonExportPath = filePath.split('.')[0] + '.json'
fs.writeFileSync(jsonExportPath, json)
console.log(jsonExportPath + ' was created.')
