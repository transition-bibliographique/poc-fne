require('should')
const sampleBNFwork = require('./fixtures/sample_BNF_work.json')
const sampleABESwork = require('./fixtures/sample_ABES_work.json')
const sampleABESpersonne = require('./fixtures/sample_ABES_personne.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')
const loadProperties = require('../lib/load/load_properties')
const loadItems = require('../lib/load/load_items')
const wbSdk = require('wikibase-sdk')
const getOrLoadHardCodedProperties = require('../lib/load/get_or_load_hard_coded_properties')

buildProps = (properties) => {
  return Promise.all([
    loadProperties(properties),
    getOrLoadHardCodedProperties()
  ])
  .then(([a, b]) => Object.assign({}, a, b))
}

describe('load items on wikibase', function () {
  this.timeout(20000)
  it('should return a list of items', done => {
    const itemPseudoId = '.0..b.fre..Les rêveries du promeneur solitaire'
    const properties = parseProperties(sampleBNFwork)
    const { items, relations } = parseNotice(sampleBNFwork)
    buildProps(properties)
      .then((wbProps) => {
        return loadItems(items, relations, wbProps)
          .then((res) => {
            const entities = Object.values(res.entities)
            const item = entities[0]
            item.labels.en.value.should.equal(itemPseudoId)
            done()
          })
      })
      .catch(done)
  })

  it('should return a list of items with relations', done => {
    const properties = parseProperties(sampleBNFwork)
    const { items, relations } = parseNotice(sampleBNFwork)

    buildProps(properties)
      .then((wbProps) => {
        return loadItems(items, relations, wbProps)
          .then((res) => {
            const oeuvreId = res.relations[0].claim.id.split('$')[0]
            const pepId = res.relations[0].claim.mainsnak.datavalue.value.id
            res.entities[oeuvreId].labels.en.value.should.equal(relations[0].subject)
            res.entities[pepId].labels.en.value.should.equal(relations[0].object)
            done()
          })
      })
      .catch(done)
  })

  it('should enrich a pre-existing item', done => {
    const workProperties = parseProperties(sampleABESwork)
    const personneProperties = parseProperties(sampleABESpersonne)
    const { items: workItems, relations } = parseNotice(sampleABESwork)
    const { items: personneItems } = parseNotice(sampleABESpersonne)
    buildProps(workProperties)
    .then((wbWorkProps) => {
      return loadItems(workItems, relations, wbWorkProps)
      .then((workLoadRes) => {
        const personneId = workLoadRes.relations[0].claim.mainsnak.datavalue.value.id
        buildProps(personneProperties)
        .then((wbPersonneProps) => {
          return loadItems(personneItems, null, wbPersonneProps)
          .then((personneLoadRes) => {
            const personneItem = Object.values(personneLoadRes.entities)[0]
            personneItem.id.should.equal(personneId)
            done()
          })
        })
      })
    })
    .catch(done)
  })

  it('should not re-create existing relations', done => {
    const workProperties = parseProperties(sampleABESwork)
    const { items, relations } = parseNotice(sampleABESwork)
    const workPseudoId = relations[0].subject
    const personnePseudoId = relations[0].object
    buildProps(workProperties)
    .then((wbWorkProps) => {
      return loadItems(items, relations, wbWorkProps)
      .then((workLoadRes1) => {
        return loadItems(items, relations, wbWorkProps)
        .then((workLoadRes2) => {
          const relationPropertyId = workLoadRes2.relations[0].claim.mainsnak.property
          const wbItems = Object.values(workLoadRes2.entities)
          const workItem = wbItems.find((item) => item.labels.en.value === workPseudoId)
          const personneItem = wbItems.find((item) => item.labels.en.value === personnePseudoId)
          // Simplify claims individually to avoid having wbSdk.simplify.claims perform a uniq on the values
          const relationClaims = workItem.claims[relationPropertyId].map(wbSdk.simplify.claim)
          relationClaims.should.deepEqual([ personneItem.id ])
          done()
        })
      })
    })
    .catch(done)
  })
})
