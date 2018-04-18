// @flow

import loginService from '../services/login.js'

const reducer = (user : Object | null = null, action : Object) : Object | null => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return user
  }
}

export const initUser = () : Object => {
  const loggedUserJSON : string = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user : Object = JSON.parse(loggedUserJSON)
    loginService.setToken(user.token)
    return ({
      type: 'LOGIN',
      user
    })
  }
  return ({ type: null })
}

export const login = (credentials : Object) : Function => {
  return async (d) => {
    const user : Object = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    d({
      type: 'LOGIN',
      user
    })
  }
}

export const logout = () : Object => {
  loginService.logout()
  window.localStorage.removeItem('loggedBlogAppUser')
  return {
    type: 'LOGOUT'
  }
}

export default reducer
