const createAtom = require('../index')

describe('onMutation', function () {
  const onMutation = jest.fn()
  beforeEach(() => {
    onMutation.mockClear()
    const actions = {
      foo: ({ mutate }) => mutate({ foo: 'bar' })
    }
    const atom = createAtom({}, actions, onMutation)
    atom.actions.foo('payload')
  })
  it('gets called on mutation', function () {
    expect(onMutation).toHaveBeenCalledTimes(1)
  })
  it('gets called with latest state', function () {
    const expectedChain = [{ action: 'foo', payload: 'payload' }]
    expect(onMutation).toHaveBeenCalledWith({ foo: 'bar' }, expectedChain)
  })
})
