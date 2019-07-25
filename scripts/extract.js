#!/usr/bin/env node
const extract = require('../lib/extract/extract')
const path = require('path')

// ie: `npm run extract echantillons/RobertFleming_BnF_14797579.txt`
const fileName = process.argv[2]
const filePath = path.resolve(fileName)

extract(filePath)
