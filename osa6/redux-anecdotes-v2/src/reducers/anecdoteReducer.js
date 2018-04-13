import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  console.log(store)
  switch (action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  case 'CREATE':
    return [...store, action.data ]
  case 'INIT':
    return action.data
  default:
    return store
  }
}

export const voteAnecdote = (anecdote) => {
  return async (d) => {
    await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    d({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async (d) => {
    const data = await anecdoteService.create(anecdote)
    d({
      type: 'CREATE',
      data
    })
  }
}

export const initAnecdotes = () => {
  return async (d) => {
    const data = await anecdoteService.getAll()
    d({
      type: 'INIT',
      data
    })
  }
}

export default reducer
