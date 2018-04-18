// @flow

import userService from '../services/users'

const reducer = (users : Array<Object> = [], action : Object) : Array<Object> => {
  switch (action.type) {
  case 'CREATE_USER':
    return [...users, action.user ]
  case 'UPDATE_USER':
    const old : Array<Object> = users.filter(u => u._id !== action.user._id)
    return [...old, action.user ]
  case 'SET_USERS':
    return action.users
  default:
    return users
  }
}

export const createUser = (user : Object) : Object => {
  return {
    type: 'CREATE_USER',
    user
  }
}

export const updateUser = (user : Object) : Object => {
  return {
    type: 'UPDATE_USER',
    user
  }
}

export const initUsers = () : Function => {
  return async (d : Function) => {
    const users = await userService.getAll()
    d({
      type: 'SET_USERS',
      users
    })
  }
}

export default reducer
