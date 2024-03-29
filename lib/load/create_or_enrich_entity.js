const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const wikibase = require('../wikibase')
const { isEmpty } = require('lodash')

module.exports = (entity) => {
  const pseudoId = entity.pseudoId = entity.pseudoId || entity.labels.en
  const { datatype } = entity
  const type = datatype ? 'property' : 'item'
  return wikibase.search({ search: pseudoId, type, limit: 1 })
    .then(createOrEnrich(entity, pseudoId))
    .then((res) => {
      res.entity.pseudoId = pseudoId
      // Wikibase action=wbeditentity doesn't return the property datatype in the creation response
      if (datatype) res.entity.datatype = datatype
      return res.entity
    })
}

const createOrEnrich = (entity, pseudoId) => (res) => {
  const firstWbResult = res.search[0]
  if (firstWbResult && firstWbResult.label === pseudoId) {
    console.log('already exists', entity.pseudoId, firstWbResult.id)
    return enrich(firstWbResult.id, entity)
  } else {
    return wbEdit.entity.create(entity)
    .then((res) => {
      console.log('created', res.entity.id, entity.pseudoId)
      return res
    })
    .catch((err) => {
      console.error('failed to create', err, entity, pseudoId)
      throw err
    })
  }
}

const enrich = (preExistingEntityId, newEntityData) => {
  return wikibase.getEntity(preExistingEntityId)
    .then((preExistingEntity) => {
      const entityChanges = removeAllConflictingData(preExistingEntity, newEntityData)
      // Most requests won't bring any new information (ex: properties)
      // so this saves quite a lot of unecessary requests
      if (hasNoChanges(entityChanges)) return { entity: preExistingEntity }
      console.log('enriched', preExistingEntityId, entityChanges)
      entityChanges.id = preExistingEntityId
      return wbEdit.entity.edit(entityChanges)
    })
}

const removeAllConflictingData = (preExistingEntity, newEntityData) => {
  removeConflictingData(preExistingEntity.labels, newEntityData.labels)
  removeConflictingData(preExistingEntity.claims, newEntityData.claims)
  return newEntityData
}

const removeConflictingData = (a, b) => {
  if (!(a && b)) return
  Object.keys(a).forEach((key) => { delete b[key] })
}

const hasNoChanges = (entityChanges) => {
  return isEmpty(entityChanges.labels) && isEmpty(entityChanges.claims)
}
