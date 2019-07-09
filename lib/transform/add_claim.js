const _ = require('lodash')

module.exports = (claims, property, value) => {
  createdClaimsProperties = _.keys(claims)
  if(createdClaimsProperties.includes(property)){
    claims[property].push(value)
  } else {
    claims[property] = [ value ]
  }
}
