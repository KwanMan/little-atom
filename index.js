module.exports = function createAtom (initialState, reactors, onMutation, options) {
  var state = initialState || {}
  reactors = reactors || {}

  options = Object.assign({}, {
    onEmit: noop,
    onMissingReactor: noop,
    mutator: function mutator (state, update) {
      return Object.assign({}, state, update)
    }
  }, options)

  var api = {
    get: get,
    mutate: mutate,
    emit: emit
  }

  return { emit: emit }

  function get () {
    return Object.assign({}, state)
  }

  function mutate (update) {
    state = options.mutator(state, update)
    onMutation(get())
  }

  function emit (action, payload) {
    options.onEmit(action, payload)
    var reactor = reactors[action]
    if (!reactor) {
      options.onMissingReactor(action, payload)
    } else {
      reactor(payload, api)
    }
  }
}

function noop () {}
