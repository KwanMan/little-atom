const createAtom = require('../index')

test('async', (done) => {
  let changes = 0
  const atom = createAtom({ count: 0 }, { increment }, onChange)

  function increment ({ get, mutate }, payload) {
    mutate({ count: get().count + 1 })
    setTimeout(() => {
      mutate({ count: get().count + 1, async: true })
      mutate({ done: true })
    }, 1)
  }

  function onChange (state) {
    changes++
    if (changes.length === 1) expect(state).toEqual({ count: 1 })
    if (changes.length === 2) expect(state).toEqual({ count: 2, async: true })
    if (state.done) {
      expect(state).toEqual({ count: 2, async: true, done: true })
      expect(changes).toEqual(3)
      done()
    }
  }

  atom.actions.increment()
})
