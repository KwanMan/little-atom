module.exports = function createAtom (initialState, reactors, onMutation, options) {
  var state = initialState || {}
  reactors = reactors || {}

  var onEmit = (options && options.onEmit) || function noop () {}
  var onMissingReactor = (options && options.onMissingReactor) || function noop () {}

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
    state = Object.assign({}, state, update)
    onMutation(get())
  }

  function emit (action, payload) {
    onEmit(action, payload)
    var reactor = reactors[action]
    if (!reactor) {
      onMissingReactor(action, payload)
    } else {
      reactor(payload, api)
    }
  }
}
