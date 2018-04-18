import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogs'
import notifReducer from './reducers/notifs'
import filterReducer from './reducers/filter'
import userReducer from './reducers/users'
import loginReducer from './reducers/login'

const reducer = combineReducers({
  blogs: blogReducer,
  notifs: notifReducer,
  filter: filterReducer,
  users: userReducer,
  login: loginReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
