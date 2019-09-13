require('should')
const sampleABESwork = require('./fixtures/sample_ABES_work.json')
const sampleABESpersonne = require('./fixtures/sample_ABES_personne.json')
const parseNotice = require('../lib/transform/parse_notice')

describe('intermarc common pivot property claims', () => {
  it('should return "URL pérenne" claims', done => {
    const item = parseNotice(sampleABESwork).items[0]
    item.claims['URL pérenne'].should.be.an.Array()
    const claim = item.claims['URL pérenne'][0]
    claim.value.should.equal('http://www.idref.fr/082349983')
    claim.references.should.be.an.Array()
    const reference = claim.references[0]
    reference.should.deepEqual({
      'identifiant de la zone': [ 'unimarc_003' ],
      'données source de la zone': [ 'http://www.idref.fr/082349983' ]
    })
    done()
  })

  it('should return "Type d\'entité" claims', done => {
    const item = parseNotice(sampleABESwork).items[0]
    item.claims["Type d'entité"].should.be.an.Array()
    const claim = item.claims["Type d'entité"][0]
    claim.value.should.equal('œuvre')
    claim.references.should.be.an.Array()
    const reference = claim.references[0]
    reference.should.deepEqual({
      'identifiant de la zone': [ 'unimarc_008' ],
      'données source de la zone': [ 'Tu5' ]
    })
    done()
  })

  it('should return "Identifiant ISNI" claims', done => {
    const item = parseNotice(sampleABESpersonne).items[0]
    item.claims['Identifiant ISNI'].should.be.an.Array()
    const claim = item.claims['Identifiant ISNI'][0]
    claim.value.should.equal('0000000121334091')
    claim.references.should.be.an.Array()
    claim.references[0].should.deepEqual({
      "Source d'import": [ 'BNF' ]
    })
    claim.references[1].should.deepEqual({
      'identifiant de la zone': [ 'unimarc_010' ],
      'données source de la zone': [ '$a 0000000121334091 $2 BNF $d 20150918' ]
    })
    done()
  })

  it('should return a specific property when repeated field/tag/zone', done => {
    const item = parseNotice(sampleABESpersonne).items[0]
    item.claims['unimarc_033_1_a_0'].should.be.an.Array()
    done()
  })
})
