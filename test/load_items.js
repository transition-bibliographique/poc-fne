require('should')
const lesReveriesDuPromeneur = require('../echantillons/LesReveriesDuPromeneur_BnF_11935154.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')
const loadProperties = require('../lib/load/load_properties')
const loadItems = require('../lib/load/load_items')

describe('load items on wikibase', function () {
  this.timeout(20000)

  it('should return a list of items', done => {
    const itemPseudoId = '.0..b.fre..Les rêveries du promeneur solitaire'
    const properties = parseProperties(lesReveriesDuPromeneur)
    const { items } = parseNotice(lesReveriesDuPromeneur)

    loadProperties(properties)
      .then((wbProps) => {
        return loadItems(items, wbProps)
          .then((res) => {
            res.should.be.an.Array()
            const item = res[0]
            item.pseudoId.should.equal(itemPseudoId)
            done()
          })
      })
      .catch(done)
  })
})
