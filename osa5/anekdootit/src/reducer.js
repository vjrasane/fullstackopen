const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    const voted = state.find(a => a.id === action.data)
    const updated = { ...voted, votes: voted.votes + 1 }
    return state.map(a => a.id !== updated.id ? a : updated)
  case 'ADD':
    const maxId = state.reduce((a,b) => a > b.id ? a : b.id, -1)
    return [...state, { id: maxId + 1, text: action.data, votes: 0 }]
  default:
    return state
  }
}

export default anecdoteReducer
