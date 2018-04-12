import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import anecdoteReducer from './reducer'

const store = createStore(anecdoteReducer)

const addAnecdote = (a) => store.dispatch({ type: 'ADD', data: a })

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
anecdotes.forEach(a => addAnecdote(a))

const Anecdote = ({ obj }) => {
  return (
    <div>
      <div>{obj.text}</div>
      <div>{obj.votes} votes <button
        onClick={() => {store.dispatch({ type: 'VOTE', data: obj.id })}}>
        vote
      </button>
      </div>
      <hr/>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAnecdote: ''
    }
  }

  render() {
    return (
      <div>
        { store.getState().sort((a,b) => b.votes - a.votes).map(a => <Anecdote key={a.id} obj={a}/>) }
        <div>
          <h3>create new</h3>
          <input value={this.state.newAnecdote} onChange={e => this.setState({ newAnecdote: e.target.value })}/>
          <button onClick={() => {
            addAnecdote(this.state.newAnecdote)
            this.setState({ newAnecdote: '' })
          }}>create</button>
        </div>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
