const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.notification
  case 'CLEAR':
    return null
  default:
    return state
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SHOW',
    notification
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

let timer
export const notify = (message, timeout=5) => {
  return async (d) => {
    if(timer)
      clearTimeout(timer)
    d(showNotification(message))
    timer = setTimeout(() => {
      d(clearNotification())
    }, timeout * 1000)
  }
}

export default reducer
