# little-atom

State management without the bulk.

...Inspired very heavily by [tiny-atom][], but not as minimal... get it?

## Usage

    $ yarn add little-atom

### Example

```js
const createAtom = require('little-atom')

const initialState = { score: 0 }

const actions = {
  increaseScore (atom, points) {
    const { score } = atom.get()
    atom.mutate({ score: score + points })
    atom.checkCount()
  },
  decreaseScore (atom, points) {
    const { score } = atom.get()
    atom.mutate({ score: score - points })
  },
  checkScore (atom, payload) {
    const { score } = atom.get()
    if (score >= 1000) {
      console.log('You win! ...something')
      atom.restart()
    }
  },
  restart (atom, payload) {
    console.log('Restarting')
    atom.mutate(initialState)
  }
}

const onMutation = ({ score }) => {
  console.log(`Your score is ${score}`)
}

const atom = createAtom(initialState, actions, onMutation)

atom.increaseScore(500)
  // -> Your score is 500

atom.decreaseScore(100)
  // -> Your score is 400

atom.increaseScore(600)
  // -> Your score is 1000
  // -> You win! ...something
  // -> Restarting
  // -> Your score is 0
```

### Async Example

```js
nst Preact = require('preact')
const axios = require('axios')
const createAtom = require('little-atom')

const initialState = {
  loading: false,
  topScore: {}
}

const actions = {
  async loadData ({ mutate }, payload) {
    mutate({ loading: true })

    const { data } = await axios.get('/top-score')
    mutate({
      loading: false,
      topScore: data.topScore
    })
  }
}

const atom = createAtom(initialState, actions, render)

const App = ({ loadData, state }) => {
  const { loading, topScore } = state
  if (loading) {
    return <div>Loading...</div>
  } else {
    if (typeof topScore === 'undefined') {
      return <button onclick={loadData}>Get top score</button>
    } else {
      return <div>{`The top score is ${topScore}`}</div>
    }
  }
}

function render (state) {
  Preact.render(<App loadData={atom.actions.loadData} state={state} />, document.body)
}

render(initialState)

```

## API

### `createAtom(initialState, actions, onMutation, options)`

Create an atom.

* `initialState` - should be an object, defaults to `{}`
* `actions` - an object of `action(atom, payload)` functions, keyed by the action name
  * `atom` - an instance of atom
  * `payload` - the payload the action was called with
* `onMutation(state, chain)` - a function called after each mutation
  * `state` - current state
  * `chain` - the chain of actions called to arrive at this mutation (for debugging)
* `options` - These are mainly used for debugging purposes
  * `options.onAction` - called when an action is run
  * `options.mutator(state, update)` - custom function to mutate state. Defaults to `Object.assign({}, state, update)`
  * `options.get(state)` - custom function to return a copy of the current state. Defaults to `Object.assign({}, state)`

**Returns**

An instance of atom

* `atom.get()` - gets the current state
* `atom.mutate(update)` - mutates the state with `update`
* `atom.actions` - object of actions available with identical signature as the passed in `actions` object

[tiny-atom]: https://github.com/QubitProducts/tiny-atom
