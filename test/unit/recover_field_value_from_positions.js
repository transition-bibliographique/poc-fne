require('should')
const recoverFieldValueFromPositions = require('../../lib/recover_field_value_from_positions')
const sampleBNFwork = require('./fixtures/sample_BNF_work.json')
const { Pos } = sampleBNFwork.controlfield[1]

it('should recover field value from positions', done => {
  const value = recoverFieldValueFromPositions(Pos)
  value.should.equal('810213060208yyfre           1776      1778                   010')
  done()
})
