const createAtom = require('../index')

describe('onMutation', function () {
  const onMutation = jest.fn()
  beforeEach(() => {
    onMutation.mockClear()
    const reactor = (payload, { mutate }) => mutate({ foo: 'bar' })
    createAtom({}, { FOO: reactor }, onMutation).emit('FOO')
  })
  it('gets called on mutation', function () {
    expect(onMutation).toHaveBeenCalledTimes(1)
  })
  it('gets called with latest state', function () {
    expect(onMutation).toHaveBeenCalledWith({ foo: 'bar' })
  })
})
