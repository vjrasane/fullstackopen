const reducer = (notifs = [], action) => {
  switch (action.type) {
  case 'PUSH':
    return [...notifs, action.notif]
  case 'POP':
    const n = [...notifs]
    n.shift()
    return n
  default:
    return notifs
  }
}

export const pushNotif = (notif) => {
  return {
    type: 'PUSH',
    notif
  }
}

export const popNotif = () => {
  return {
    type: 'POP'
  }
}

export const notify = (message, type, timeout=5) => {
  return async (d) => {
    d(pushNotif({ message, type }))
    setTimeout(() => {
      d(popNotif())
    }, timeout * 1000)
  }
}

export default reducer
