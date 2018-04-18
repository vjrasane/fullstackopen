import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class BlogView extends React.Component {
  render() {
    return (
      <div className='blogView'>
        <h2>blogs</h2>
        <BlogForm/>
        <br/>
        {this.props.blogs
          .sort((a,b) => b.likes - a.likes)
          .map(b =>
            <Blog key={b._id} blog={b}/>)}
        <hr/>
      </div>
    )
  }
}

BlogView.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default connect((s) => {
  return { blogs: s.blogs }
})(BlogView)
