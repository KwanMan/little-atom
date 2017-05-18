const createAtom = require('../index')

function noop () {}

describe('onAction', function () {
  const onAction = jest.fn()
  beforeEach(() => {
    onAction.mockClear()
    const atom = createAtom({}, { foo: noop }, noop, { onAction })
    atom.actions.foo('payload')
  })
  it('gets called when running action', function () {
    expect(onAction).toHaveBeenCalledTimes(1)
  })
  it('gets called with the correct params', function () {
    expect(onAction).toHaveBeenCalledWith('foo', 'payload')
  })
})
