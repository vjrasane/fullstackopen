import React from 'react'
import loginService from '../services/login'
import InputFields from './InputFields'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  input = (event) => {
    console.log("input called", event.target);
    this.setState({ [event.target.name]: event.target.value })
  }

  clear = () => {
    this.setState({ username: '', password: '' })
  }

  login = async (event) => {
    console.log("loginview login", this.state);
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log("login response", user);
      this.clear()
      this.props.onlogin(user)
    } catch (ex) {
      console.log("login error", ex);
      this.props.notify('invalid username or password', 'error')
    }
  }

  render() {
    return (
      <div className='loginView'>
        <Togglable
          expandLabel="Login"
          collapseLabel="Cancel">
          <h1>Login to application</h1>
          <InputFields
            fields={['Username', 'Password']}
            state={this.state}
            input={this.input}/>
          <button className='button login' onClick={this.login}>Login</button>
        </Togglable>
      </div>
    );
  }
}

LoginView.propTypes = {
  onlogin: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default LoginView;
