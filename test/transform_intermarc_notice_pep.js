require('should')
const sampleBNFpep = require('./fixtures/sample_BNF_pep.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')

describe('create pseudo properties from an intermarc pep', function () {
  this.timeout(20000)

  describe('transform controlfield', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'intermarc_001'
      const properties = parseProperties(sampleBNFpep)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
  describe('transform leader', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'intermarc_leader'
      const properties = parseProperties(sampleBNFpep)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
})

describe('create a pseudo item from an intermarc pep', () => {
  describe('transform datafield', () => {
    it('should return a pseudo item id', done => {
      const itemPseudoId = '0  b.Fleming.Robert.1921-1976'
      const { items } = parseNotice(sampleBNFpep)
      const item = items[0]
      item.should.be.an.Object()
      item.pseudoId.should.equal(itemPseudoId)
      item.labels.en.should.equal(itemPseudoId)
      item.labels.fr.should.equal(itemPseudoId)
      done()
    })
  })
  describe('transform datacontrol', () => {
    it('should return pseudo claims', done => {
      const itemPropertyPseudoId = 'intermarc_001'
      const { items } = parseNotice(sampleBNFpep)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('FRBNF14797579X')
      done()
    })
  })

  describe('pivot property claims', () => {
    it('should return "URL pérenne" claims', done => {
      const item = parseNotice(sampleBNFpep).items[0]
      item.claims["URL pérenne"].should.be.an.Array()
      const claim = item.claims["URL pérenne"][0]
      claim.value.should.equal('http://catalogue.bnf.fr/ark:/12148/cb147975794')
      claim.references.should.be.an.Array()
      const reference = claim.references[0]
      reference.should.deepEqual({
        'identifiant de la zone': 'intermarc_003',
        'données source de la zone': 'http://catalogue.bnf.fr/ark:/12148/cb147975794'
      })
      done()
    })

    it('should return "Type d\'entité" claims', done => {
      const item = parseNotice(sampleBNFpep).items[0]
      item.claims["Type d'entité"].should.be.an.Array()
      const claim = item.claims["Type d'entité"][0]
      claim.value.should.equal('personne')
      claim.references.should.be.an.Array()
      const reference = claim.references[0]
      reference.should.deepEqual({
        'identifiant de la zone': 'intermarc_000',
        'données source de la zone': '00615c0 ap22000272  45'
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
})
