import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class BlogView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
    }
  }

  componentDidMount() {
    this.refresh()
  }

  submit = (blog) => {
    this.props.notify(`added new blog '${blog.title}' by ${blog.author}`, 'message')
    this.togglable.toggle()
    this.refresh()
  }

  like = async (blog) => {
    blog.likes += 1
    await blogService.update(blog._id, blog)
    this.props.notify(`liked blog '${blog.title}' by ${blog.author}`, 'message')
    this.refresh()
  }

  remove = async (blog) => {
    if (window.confirm(`delete ''${blog.title}' by ${blog.author}'?`)) {
      await blogService.remove(blog._id)
      this.props.notify(`removed blog '${blog.title}' by ${blog.author}`, 'message')
      this.refresh()
    }
  }

  refresh = async () => {
    const blogs = await blogService.getAll()
    this.setState({ blogs: blogs })
  }

  render() {
    return (
      <div className='blogView'>
        <h2>blogs</h2>
        {this.state.blogs
          .sort((a,b) => b.likes - a.likes)
          .map(b =>
            <Blog
              key={b._id}
              blog={b}
              like={this.like}
              remove={this.remove}
              username={this.props.user.username}
            />)}
        <hr/>
        <Togglable
          expandLabel="Submit Blog"
          collapseLabel="Cancel"
          ref={c => this.togglable = c}>
          <BlogForm onsubmit={this.submit}/>
        </Togglable>
      </div>
    )
  }
}

BlogView.propTypes = {
  notify: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default BlogView
