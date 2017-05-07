const createAtom = require('../index')

describe('reactor', function () {
  const reactor = jest.fn()
  beforeEach(() => {
    reactor.mockClear()
    createAtom({}, { FOO: reactor }).emit('FOO', 'bar')
  })
  it('reacts to the correct action', function () {
    expect(reactor).toHaveBeenCalledTimes(1)
  })
  it('gets called with the correct payload', function () {
    expect(reactor.mock.calls[0][0]).toEqual('bar')
  })
})
