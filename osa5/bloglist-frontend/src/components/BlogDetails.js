import React from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, like, remove, username }) => {
  const canDelete = username && (!blog.user || blog.user.username === username)
  return (
    <div className='blog details'>
      <a href={blog.url}>{blog.url}</a>
      <div>likes: {blog.likes} <button onClick={() => like(blog)}>like</button></div>
      {blog.user ?
        <div>added by {blog.user.username}</div> :
        null}
      {canDelete ? <button onClick={() => remove(blog)}>delete</button> : null }
    </div>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default BlogDetails
