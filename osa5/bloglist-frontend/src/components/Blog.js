import React from 'react'
import Expandable from './Expandable'
import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  toggle = () => {
    this.toggleable.toggle()
  }

  render() {
    return (
      <div className='blog'>
        <div
          className='title'
          onClick={this.toggle}>
          {this.props.blog.title}, {this.props.blog.author}
        </div>
        <Expandable ref={c => this.toggleable = c}>
          <BlogDetails
            blog={this.props.blog}
            like={this.props.like}
            remove={this.props.remove}
            username={this.props.username}
          />
        </Expandable>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  username: PropTypes.string
}

export default Blog
