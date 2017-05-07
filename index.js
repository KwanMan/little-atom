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

  return { emit: createEmit([]) }

  function get () {
    return Object.assign({}, state)
  }

  function mutate (update) {
    state = options.mutator(state, update)
    onMutation(get())
  }

  function createEmit (chain) {
    return function emit (action, payload) {
      chain.push({ action: action, payload: payload })
      options.onEmit(action, payload, chain)

      var reactor = reactors[action]
      if (!reactor) return options.onMissingReactor(action, payload)

      reactor(payload, {
        get: get,
        mutate: mutate,
        emit: createEmit(chain.slice(0))
      })
    }
  }
}

function noop () {}
