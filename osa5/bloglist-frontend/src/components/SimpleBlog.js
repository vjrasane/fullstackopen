import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
  return (
    <div>
      <div className="blog_info">
        {blog.title} {blog.author}
      </div>
      <div className="blog_details">
        blog has {blog.likes} likes
        <button onClick={onClick}>like</button>
      </div>
    </div>
  )
}

export default SimpleBlog
