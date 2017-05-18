const createAtom = require('../index')

test('chain', () => {
  const onMutation = jest.fn()
  const atom = createAtom({}, {
    first ({ actions }) {
      actions.second('payload2')
    },
    second ({ mutate }) {
      mutate({})
    }
  }, onMutation)

  atom.actions.first('payload1')

  const expected = [
    { action: 'first', payload: 'payload1' },
    { action: 'second', payload: 'payload2' }
  ]

  expect(onMutation.mock.calls[0][1]).toEqual(expected)
})
