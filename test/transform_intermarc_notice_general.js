require('should')
const sampleBNFwork = require('./fixtures/sample_BNF_work.json')
const sampleBNFpep = require('./fixtures/sample_BNF_pep.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')

describe('intermarc common pivot property claims', () => {
  it('should return "URL pérenne" claims', done => {
    const item = parseNotice(sampleBNFwork).items[0]
    item.claims["URL pérenne"].should.be.an.Array()
    const claim = item.claims["URL pérenne"][0]
    claim.value.should.equal('http://catalogue.bnf.fr/ark:/12148/cb11935154w')
    claim.references.should.be.an.Array()
    const reference = claim.references[0]
    reference.should.deepEqual({
      'identifiant de la zone': 'intermarc_003',
      'données source de la zone': 'http://catalogue.bnf.fr/ark:/12148/cb11935154w'
    })
    done()
  })

  it('should return "Type d\'entité" claims', done => {
    const item = parseNotice(sampleBNFwork).items[0]
    item.claims["Type d'entité"].should.be.an.Array()
    const claim = item.claims["Type d'entité"][0]
    claim.value.should.equal('œuvre')
    claim.references.should.be.an.Array()
    const reference = claim.references[0]
    reference.should.deepEqual({
      'identifiant de la zone': 'intermarc_000',
      'données source de la zone': '00469c1 as22000272  45'
    })
    done()
  })

  it('should return "Identifiant ISNI" claims', done => {
    const item = parseNotice(sampleBNFpep).items[0]
    item.claims["Identifiant ISNI"].should.be.an.Array()
    const claim = item.claims["Identifiant ISNI"][0]
    claim.value.should.equal('0000000073689743')
    claim.references.should.be.an.Array()
    claim.references[0].should.deepEqual({
      "Source d'import": 'VIAF'
    })
    claim.references[1].should.deepEqual({
      'identifiant de la zone': 'intermarc_031',
      'données source de la zone': '$a 0000000073689743 $2 VIAF $d 20130802'
    })
    done()
  })
})