const createAtom = require('../index')

function noop () {}

test('chain', () => {
  const onEmit = jest.fn()
  const atom = createAtom({}, {
    FIRST (payload, { emit }) {
      emit('SECOND', 'payload2')
    },
    SECOND () {}
  }, noop, { onEmit })

  atom.emit('FIRST', 'payload1')

  const expected = [
    { action: 'FIRST', payload: 'payload1' },
    { action: 'SECOND', payload: 'payload2' }
  ]

  expect(onEmit.mock.calls[0][2]).toEqual(expected.slice(0, 1))
  expect(onEmit.mock.calls[1][2]).toEqual(expected)
})
