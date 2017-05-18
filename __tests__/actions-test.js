const createAtom = require('../index')

describe('actions', function () {
  const fooAction = jest.fn()
  beforeEach(() => {
    fooAction.mockClear()
    const atom = createAtom({}, { fooAction })
    atom.actions.fooAction('payload')
  })
  it('reacts to the correct action', function () {
    expect(fooAction).toHaveBeenCalledTimes(1)
  })
  it('gets called with the correct payload', function () {
    expect(fooAction.mock.calls[0][1]).toEqual('payload')
  })
})
