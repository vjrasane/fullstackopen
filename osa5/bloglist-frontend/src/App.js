import React from 'react'
import LoginView from './components/LoginView'
import UserInfoView from './components/UserInfoView'
import BlogView from './components/BlogView'
import NotificationFlow from './components/NotificationFlow'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      notifications: [],
    }
  }

  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      loginService.setToken(user.token)
    }
  }

  notify = (message, type) => {
    const notifications =
      this.state.notifications.concat({
        message,
        type
      })
    this.setState({ notifications })
    setTimeout(() => {
      const notifications = [...this.state.notifications]
      notifications.shift()
      this.setState({ notifications: notifications })
    }, 3000)
  }

  login = (user) => {
    loginService.setToken(user.token) // tämä ennen setStatea!
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    this.notify(`logged in as ${user.username}`, 'message')
    this.setState({ user })
  }

  logout = () => {
    loginService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out', 'message')
    this.setState({ user: null })
  }

  render() {
    return (
      <div>
        { this.state.user !== null ?
          <UserInfoView
            username={this.state.user.username}
            onlogout={this.logout}/> :
          <LoginView
            notify={this.notify}
            visible={false}
            onlogin={this.login}/>
        }
        <hr/>
        <NotificationFlow notifications={this.state.notifications}/>
        { this.state.user !== null ?
          <BlogView
            user={this.state.user}
            notify={this.notify}/> :
          null }
      </div>
    );
  }
}

export default App;
