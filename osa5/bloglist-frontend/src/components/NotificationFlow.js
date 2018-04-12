import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={ 'notification ' + type }>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

const NotificationFlow = ({ notifications }) => {
  return (
    <div>
      {notifications.map((n,i) =>
        <Notification
          key={`${n.message}_${i}_${new Date().getTime()}`}
          message={n.message}
          type={n.type}/>)}
    </div>
  )
}

NotificationFlow.propTypes = {
  notifications: PropTypes.array.isRequired
}

export default NotificationFlow
