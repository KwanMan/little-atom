const createAtom = require('../index')

function noop () {}

describe('onEmit', function () {
  const onEmit = jest.fn()
  beforeEach(() => {
    onEmit.mockClear()
    createAtom({}, {}, noop, { onEmit }).emit('FOO', 'bar')
  })
  it('gets called when emitting', function () {
    expect(onEmit).toHaveBeenCalledTimes(1)
  })
  it('gets called with the correct params', function () {
    expect(onEmit.mock.calls[0].slice(0, 2)).toEqual(['FOO', 'bar'])
  })
})
