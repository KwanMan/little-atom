const createAtom = require('../index')

describe('createAtom', function () {
  it('only exports an emit function', function () {
    const atom = createAtom()
    expect(Object.keys(atom)).toEqual(['emit'])
  })
})
