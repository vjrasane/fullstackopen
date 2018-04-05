import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.onclick}>{props.text}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const rand = (max) => {
  return Math.floor(Math.random() * max);
}

const Anecdote = (props) => {
  return (
    <div>
      <div>{props.text}</div>
      <div><h4>{props.votes} votes</h4></div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected : rand(anecdotes.length),
      votes: Array(anecdotes.length).fill(0)
    }
  }

  randomize() {
    this.setState({
      selected : rand(anecdotes.length)
    });
  }

  vote() {
    let votes = [...this.state.votes];
    votes[this.state.selected] += 1;
    this.setState({
      votes: votes
    });
  }

  render() {
    let popular = this.state.votes.indexOf(Math.max(...this.state.votes));
    return (
      <div>
        <Anecdote text={this.props.anecdotes[this.state.selected]} votes={this.state.votes[this.state.selected]} />
        <div><Button text="vote" onclick={() => this.vote()}/><Button text="next anecdote" onclick={() => this.randomize()}/></div>
        <div><h3>anecdote with most votes:</h3></div>
        <Anecdote text={this.props.anecdotes[popular]} votes={this.state.votes[popular]} />
      </div>
    )
  }
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
