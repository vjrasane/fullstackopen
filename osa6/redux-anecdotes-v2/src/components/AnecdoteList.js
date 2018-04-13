import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  vote = async (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => this.vote(anecdote)}>
                  vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

const filterAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

export default connect((s) => {
  return {
    anecdotes: filterAnecdotes(s.anecdotes, s.filter)
  }
}, {
  voteAnecdote,
  notify
}) (AnecdoteList)
