import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import InputFields from './InputFields'
import { Link } from 'react-router-dom'
import { createUser } from '../reducers/users'
import { notify } from '../reducers/notifs'
import { connect } from 'react-redux'

const User = ({ user }) => {
  return (
    <tr><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
  )
}

class UserListView extends React.Component {
  submit = async () => {
    try {
      const username = this.inputs.state.username
      if (this.props.users.find(u => u.name === username))
        this.props.notify(`user '${username}' already exists`, 'error')
      else {
        await this.props.createUser(this.inputs.state)
        this.props.notify(`created new user '${username}'`, 'success')
        this.inputs.clear()
        this.togglable.toggle()
      }
    } catch (ex) {
      this.props.notify(`error: ${ex}`, 'error')
    }
  }

  render() {
    return (
      <div className='userListView'>
        <h2>users</h2>
        <Togglable
          expandLabel="Create New"
          collapseLabel="Cancel"
          ref={c => this.togglable = c}>
          <InputFields
            fields={['Username', 'Password']}
            ref={c => this.inputs = c}/>
          <button onClick={this.submit}>Submit</button>
        </Togglable>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Blogs</th>
            </tr>
            {this.props.users.map(u => <User key={u.name} user={u}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

UserListView.propTypes = {
  users: PropTypes.array.isRequired,
  createUser: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default connect((s) => {
  return { users: s.users }
}, { createUser, notify })(UserListView)
