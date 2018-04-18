import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'

class UserView extends React.Component {
  render() {
    return (
      <div className='userView'>
        { this.props.user ? (
          <div>
            <h2>{this.props.user.name}</h2>
            <h3>Added blogs</h3>
            {this.props.user.blogs
              .sort((a,b) => b.likes - a.likes)
              .map(b =>
                <Blog key={b._id} blog={b}/>)}
          </div>
        ) : null }
      </div>
    )
  }
}

// Ei prop typejä koska initialisaation aikana käyttäjiä ei välttämättä vielä ole

export default connect((s, props) => {
  return {
    user: s.users.find(u => u._id === props.id)
  }
})(UserView)
