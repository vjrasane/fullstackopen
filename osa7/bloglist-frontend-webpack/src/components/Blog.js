import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Blog extends React.Component {
  render() {
    return (
      <div className='blog'>
        <div className='title'>
          <Link to={`/blogs/${this.props.blog._id}`}>{this.props.blog.title}, {this.props.blog.author}</Link>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
