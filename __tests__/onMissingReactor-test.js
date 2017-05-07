const createAtom = require('../index')

function noop () {}

describe('onMissingReactor', function () {
  describe('when there is no reactor', () => {
    const onMissingReactor = jest.fn()
    beforeEach(() => {
      onMissingReactor.mockClear()
      createAtom({}, {}, noop, { onMissingReactor }).emit('FOO', 'bar')
    })
    it('gets called', function () {
      expect(onMissingReactor).toHaveBeenCalledTimes(1)
    })
    it('gets called with the correct params', function () {
      expect(onMissingReactor).toHaveBeenCalledWith('FOO', 'bar')
    })
  })
  describe('when there is a reactor present', () => {
    const onMissingReactor = jest.fn()
    beforeEach(() => {
      onMissingReactor.mockClear()
      createAtom({}, { FOO: noop }, noop, { onMissingReactor }).emit('FOO', 'bar')
    })
    it('does not get called', function () {
      expect(onMissingReactor).not.toHaveBeenCalled()
    })
  })
})
