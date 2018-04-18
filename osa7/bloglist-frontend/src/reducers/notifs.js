// @flow

const reducer = (notifs : Array<Object> = [], action : Object) : Array<Object> => {
  switch (action.type) {
  case 'PUSH':
    return [...notifs, action.notif]
  case 'POP':
    const n : Array<Object> = [...notifs]
    n.shift()
    return n
  default:
    return notifs
  }
}

export const pushNotif = (notif : Object) : Object => {
  return {
    type: 'PUSH',
    notif
  }
}

export const popNotif = () : Object => {
  return {
    type: 'POP'
  }
}

export const notify = (message : String, type : string, timeout : number = 5) : Function => {
  return async (d : Function) => {
    d(pushNotif({ message, type }))
    setTimeout(() => {
      d(popNotif())
    }, timeout * 1000)
  }
}

export default reducer
