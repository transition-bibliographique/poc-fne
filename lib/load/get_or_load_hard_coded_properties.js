const loadProperties = require ('./load_properties')
const hardCodedProperties = require ('../hard_coded_properties')

var loadHardCodedPropertiesPromise

module.exports = () => {
  if (!loadHardCodedPropertiesPromise) {
    loadHardCodedPropertiesPromise = loadHardCodedProperties()
  }
  return loadHardCodedPropertiesPromise
}

const loadHardCodedProperties = () => {
  const pseudoProps = Object.keys(hardCodedProperties)
    .reduce((props, pseudoId) => {
      const datatype = hardCodedProperties[pseudoId]

      props[pseudoId] = buildPseudoProperty(pseudoId, datatype)

      return props
    }, {})
  return loadProperties(pseudoProps)
}

const buildPseudoProperty = (pseudoId, datatype) => {
  return {
    type: 'property',
    pseudoId,
    datatype,
    labels: {
      fr: pseudoId,
      en: pseudoId
    }
  }
}
