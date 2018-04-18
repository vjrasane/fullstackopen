import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../reducers/login'
import { notify } from '../reducers/notifs'

class UserInfoView extends React.Component {
  logout = () => {
    this.props.logout()
    this.props.notify('logged out', 'message')
  }

  render() {
    return (
      <div>
        <div className='userInfo'>{this.props.login + ' logged in '}<button className='button logout' onClick={this.logout}>Logout</button></div>
      </div>
    )
  }
}

UserInfoView.propTypes = {
  login: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default connect((s) => {
  return {
    login: s.login.username
  }
}, { logout, notify })(UserInfoView)
