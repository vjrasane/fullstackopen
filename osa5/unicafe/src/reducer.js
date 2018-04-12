const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const next = { ...state }
  if (['GOOD', 'BAD', 'OK'].includes(action.type))
    next[action.type.toLowerCase()] += 1
  else if (action.type === 'ZERO')
    return initialState
  return next
}

export default counterReducer
