const createAtom = require('../index')

describe('createAtom', function () {
  it('exports correct API', function () {
    const actions = {
      foo () {},
      bar () {}
    }
    const atom = createAtom({}, actions, () => {})
    expect(Object.keys(atom)).toEqual(['get', 'mutate', 'actions'])
    expect(Object.keys(atom.actions)).toEqual(['foo', 'bar'])
  })
})
