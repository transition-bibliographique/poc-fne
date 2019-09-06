require('should')
const sampleBNFpep = require('./fixtures/sample_BNF_pep.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')
const loadProperties = require('../lib/load/load_properties')
const getOrLoadHardCodedEntities = require('../lib/load/get_or_load_hard_coded_entities')
const loadItem = require('../lib/load/load_item')

describe('load item on wikibase', function () {
  this.timeout(20000)

  it('should return an item with a wb id and wb claims', done => {
    const itemPseudoId = '0  b.Fleming.Robert.1921-1976'
    const properties = parseProperties(sampleBNFpep)
    const { items } = parseNotice(sampleBNFpep)
    const item = items[0]

    Promise.all([
      loadProperties(properties),
      getOrLoadHardCodedEntities().then((res) => res.properties)
    ])
      .then(([a, b]) => Object.assign({}, a, b))
      .then((wbProps) => {
        return loadItem(item, wbProps)
          .then((res) => {
            res.should.be.an.Object()
            res.pseudoId.should.equal(itemPseudoId)
            res.id.should.startWith('Q')
            Object.keys(res.claims).forEach((claim) => {
              claim.should.startWith('P')
            })
            done()
          })
      })
    .catch(done)
  })
})
