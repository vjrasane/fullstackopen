import React from 'react'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'
import AnecdoteList from './components/AnecdoteForm'
import AnecdoteForm from './components/AnecdoteList'
import { connect } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'

class App extends React.Component {
  componentDidMount = async () => {
    this.props.initAnecdotes()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <br/>
        <FilterForm />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    )
  }
}

export default connect(
  null,
  { initAnecdotes }
)(App)
