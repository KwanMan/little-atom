module.exports = function createAtom (initialState, reactors, subscriber) {
  var state = initialState || {}
  reactors = reactors || {}

  return {
    emit: emit
  }

  function emit (action, payload) {
    if (reactors[action]) {
      reactors[action](payload, {
        get: get,
        mutate: mutate,
        emit: emit
      })
    }
  }

  function mutate (update) {
    state = Object.assign({}, state, update)
    subscriber(get())
  }

  function get () {
    return Object.assign({}, state)
  }
}
