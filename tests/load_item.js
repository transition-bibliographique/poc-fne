require('should')
const robertFlemingNotice = require('./fixtures/RobertFleming_BnF_14797579.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseItem = require('../lib/transform/parse_items')
const loadProperties = require('../lib/load/load_properties')
const loadItem = require('../lib/load/load_item')

describe('load items on wikibase', () => {
  it('should return an item with a wb id and wb claims', done => {
    const itemPseudoId = '0  b.Fleming.Robert.1921-1976'
    const properties = parseProperties(robertFlemingNotice)
    const item = parseItem(robertFlemingNotice)

    loadProperties(properties)
      .then((wbProps) => {
        loadItem(item, wbProps)
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
