import React from 'react'
import PropTypes from 'prop-types'

const UserInfoView = ({ username, onlogout }) => {
  return (
    <div>
      <div className='userInfo'>{username + ' logged in '}
        <button className='button logout' onClick={onlogout}>Logout</button>
      </div>
      <br/>
    </div>
  )
}

UserInfoView.propTypes = {
  username: PropTypes.string.isRequired,
  onlogout: PropTypes.func.isRequired
}

export default UserInfoView
