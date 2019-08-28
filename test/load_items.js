require('should')
const sampleBNFwork = require('./fixtures/sample_BNF_work.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')
const loadProperties = require('../lib/load/load_properties')
const loadItems = require('../lib/load/load_items')

describe('load items on wikibase', function () {
  this.timeout(20000)

  it('should return a list of items', done => {
    const itemPseudoId = '.0..b.fre..Les rêveries du promeneur solitaire'
    const properties = parseProperties(sampleBNFwork)
    const { items, relations } = parseNotice(sampleBNFwork)

    loadProperties(properties)
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
    const relationProperty = 'intermarc_s_100'
    const properties = parseProperties(sampleBNFwork)
    const { items, relations } = parseNotice(sampleBNFwork)

    loadProperties(properties)
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
})
