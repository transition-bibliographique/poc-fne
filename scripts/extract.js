#!/usr/bin/env node
const extract = require('../lib/extract/extract')
const path = require('path')

// ie: `npm run extract ./echantillons/BNF_echantillon_donnes_ALL.xml`
const fileName = process.argv[2]
const filePath = path.resolve(fileName)

extract(filePath)
