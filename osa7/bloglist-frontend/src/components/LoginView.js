import React from 'react'
import InputFields from './InputFields'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../reducers/login'
import { notify } from '../reducers/notifs'

class LoginView extends React.Component {
  login = async () => {
    try {
      const username = this.inputs.state.username
      await this.props.login({
        username: username,
        password: this.inputs.state.password
      })
      this.props.notify(`logged in as ${username}`, 'message')
    } catch (ex) {
      this.props.notify('invalid username or password', 'error')
    }
  }

  render() {
    return (
      <div className='loginView'>
        <Togglable
          expandLabel='Login'
          collapseLabel='Cancel'>
          <h1>Login to application</h1>
          <InputFields
            fields={['Username', 'Password']}
            ref={c => this.inputs = c}/>
          <button className='button login' onClick={this.login}>Login</button>
        </Togglable>
      </div>
    )
  }
}

LoginView.propTypes = {
  login: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default connect(null, { login, notify })(LoginView)
