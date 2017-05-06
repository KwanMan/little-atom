# little-atom

State management without the bulk.

...Inspired very heavily by [tiny-atom][], but not as minimal... get it?

## Usage

    $ yarn add little-atom

### Example

```js
const createAtom = require('little-atom')

const initialState = { score: 0 }

const reactors = {
  INCREASE (points, { get, mutate, emit }) {
    const { score } = get()
    mutate({ score: score + points })
    emit('CHECK_COUNT')
  },
  DECREASE (points, { get, mutate, emit }) {
    const { score } = get()
    mutate({ score: score - points })
  },
  CHECK_COUNT (payload, { get, mutate, emit }) {
    const { score } = get()
    if (score >= 1000) {
      console.log('You win! ...something')
      emit('RESTART')
    }
  },
  RESTART (payload, { get, mutate, emit }) {
    console.log('Restarting')
    mutate(initialState)
  }
}

const onMutation = ({ score }) => {
  console.log(`Your score is ${score}`)
}

const atom = createAtom(initialState, reactors, onMutation)

atom.emit('INCREASE', 500)
  // -> Your score is 500

atom.emit('DECREASE', 100)
  // -> Your score is 400

atom.emit('INCREASE', 600)
  // -> Your score is 1000
  // -> You win! ...something
  // -> Restarting
  // -> Your score is 0
```

### Async Example

```js
const Preact = require('preact')
const axios = require('axios')
const createAtom = require('little-atom')

const initialState = {
  loading: false,
  topScore: {}
}

const reactors = {
  async LOAD_DATA (payload, { get, mutate, emit }) {
    mutate({ loading: true })

    const { data } = await axios.get('/top-score')
    mutate({
      loading: false,
      topScore: data.topScore
    })
  }
}

const atom = createAtom(initialState, reactors, render)

const App = ({ emit, state }) => {
  const { loading, topScore } = state
  if (loading) {
    return <div>Loading...</div>
  } else {
    if (typeof topScore === 'undefined') {
      return <button onclick={() => emit('LOAD_DATA')}>Get top score</button>
    } else {
      return <div>{`The top score is ${topScore}`}</div>
    }
  }
}

function render (state) {
  Preact.render(<App emit={atom.emit} state={state} />, document.body)
}

render(initialState)

```

## API

### `createAtom(initialState, reactors, onMutation, options)`

Create an atom.

* `initialState` - should be an object, defaults to `{}`
* `reactors` - an object of `reactor(payload, api)` functions, keyed by the action to react to
  * `payload` - the payload the action was emitted with
  * `api.get()` - get current state
  * `api.mutate(update)` - mutate the state with `Object.assign({}, state, update)`
  * `api.emit(action, payload)` - emit a new action
* `onMutation(state)` - a function called after each mutation
  * `state` - current state
* `options` - These are mainly used for debugging purposes
  * `options.onEmit` - a function called when a new action is emitted
  * `options.onMissingReactor(action, payload)` - a function called when there is no reactor found for an action

### `atom.emit(action, payload)`

Emit an action.

* `action` - a string describing the type of action
* `payload` - payload with information about the action

[tiny-atom]: https://github.com/QubitProducts/tiny-atom
