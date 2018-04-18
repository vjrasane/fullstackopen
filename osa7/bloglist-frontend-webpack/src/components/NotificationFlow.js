import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

class NotificationFlow extends React.Component {
  render() {
    return (
      <div className='notificationContainer'>
        {this.props.notifs.map((n,i) =>
          <Notification
            key={`${n.message}_${i}_${new Date().getTime()}`}
            message={n.message}
            type={n.type}/>)}
      </div>
    )
  }
}

NotificationFlow.propTypes = {
  notifs: PropTypes.array.isRequired
}

export default connect((s) => {
  return { notifs: s.notifs }
})(NotificationFlow)
