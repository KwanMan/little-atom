module.exports = function createAtom (initialState, rawActions, onMutation, options) {
  var state = initialState || {}

  options = Object.assign({}, {
    onAction: noop,
    get: function (state) {
      return Object.assign({}, state)
    },
    mutator: function mutator (state, update) {
      return Object.assign({}, state, update)
    }
  }, options)

  return createAtom([])

  function createAtom (chain) {
    return {
      get: createGet(),
      mutate: createMutate(chain),
      actions: createActions(chain)
    }
  }

  function createGet () {
    return function get () {
      return options.get(state)
    }
  }

  function createMutate (chain) {
    return function mutate (update) {
      state = options.mutator(state, update)
      onMutation(options.get(state), chain)
    }
  }

  function createActions (chain) {
    var actions = {}
    Object.keys(rawActions).forEach(function (key) {
      actions[key] = function (payload) {
        options.onAction(key, payload)
        chain.push({ action: key, payload: payload })
        rawActions[key](createAtom(chain), payload)
      }
    })
    return actions
  }
}

function noop () {}
