import React from 'react'
import PropTypes from 'prop-types'
import LoginView from './components/LoginView'
import UserInfoView from './components/UserInfoView'
import UserListView from './components/UserListView'
import UserView from './components/UserView'

import BlogListView from './components/BlogListView'
import BlogView from './components/BlogView'

import NotificationFlow from './components/NotificationFlow'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { initUser } from './reducers/login'
import { initUsers } from './reducers/users'
import { initBlogs } from './reducers/blogs'
import { connect } from 'react-redux'

const Menu = (props) => {
  const style = {
    color: 'deepskyblue',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
  }
  const active = {
    background: 'lightblue',
    color: 'white',
    borderRadius: 5,
  }
  return (
    <div className="menuBar">
      <NavLink className='menuLink' style={style} activeStyle={active} exact to="/">blogs</NavLink> &nbsp;
      <NavLink className='menuLink' style={style} activeStyle={active} exact to="/users">users</NavLink>{props.children}
    </div>
  )
}

class App extends React.Component {
  componentDidMount = async () => {
    this.props.initBlogs()
    this.props.initUser()
    this.props.initUsers()
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NotificationFlow/>
            <h1>blog app</h1>
            <Menu>
              { this.props.login !== null ? <UserInfoView/> : <LoginView/> }
            </Menu>
            <hr/>
            { this.props.login !== null ?
              <div className="content">
                <Route exact path="/" render={() => <BlogListView/>} />
                <Route exact path="/users/:id" render={({ match }) =>
                  <UserView id={match.params.id}/>}
                />
                <Route exact path="/blogs/:id" render={({ history, match }) =>
                  <BlogView id={match.params.id} history={history}/>}
                />
                <Route exact path="/users" render={() => <UserListView/>} />
              </div>
              : null }
          </div>
        </Router>
      </div>
    )
  }
}

App.propTypes = {
  initUser: PropTypes.func.isRequired,
  initUsers: PropTypes.func.isRequired,
  initBlogs: PropTypes.func.isRequired
}

export default connect((s) => {
  return { login: s.login }}, { initUser, initUsers, initBlogs })(App)
