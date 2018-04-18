import React from 'react'
import PropTypes from 'prop-types'
import InputFields from './InputFields'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { notify } from '../reducers/notifs'

class BlogView extends React.Component {
  like = async () => {
    await blogService.like(this.props.blog)
    this.props.notify(`liked blog '${this.props.blog.title}' by ${this.props.blog.author}`, 'message')
  }

  remove = async () => {
    if (window.confirm(`delete ''${this.props.blog.title}' by ${this.props.blog.author}'?`)) {
      await blogService.remove(this.props.blog._id)
      this.props.notify(`removed blog '${this.props.blog.title}' by ${this.props.blog.author}`, 'success')
      this.props.history.push('/', 10)
    }
  }

  submit = async () => {
    try {
      await blogService.comment({ blog: this.props.blog._id, text: this.inputs.state.comment })
      this.props.notify(`commented on blog '${this.props.blog.title}'`, 'message')
      this.inputs.clear()
    } catch (ex) {
      this.props.notify(`error: ${ex}`, 'error')
    }
  }

  render() {
    const blog = this.props.blog
    if (!blog)
      return null

    const canDelete = this.props.login &&
      (!blog.user || blog.user.username === this.props.login)
    return (
      <div className='blog details'>
        <h4>{blog.title}, {blog.author}</h4>
        <a href={blog.url}>{blog.url}</a>
        <div>likes: {blog.likes} <button onClick={this.like}>like</button></div>
        {blog.user ?
          <div>added by {blog.user.username}</div> :
          null}
        {canDelete ? <button onClick={this.remove}>delete</button> : null }
        <h4>comments</h4>
        { blog.comments.length > 0 ?
          <ul>
            {blog.comments.map(c => <li key={c._id}>{c.text}</li>)            }
          </ul> : <p>no comments</p> }
        <InputFields fields={['Comment']} ref={c => this.inputs = c}/>
        <button onClick={this.submit}>Add Comment</button>
      </div>
    )
  }
}

BlogView.propTypes = {
  // likeBlog: PropTypes.func.isRequired,
  // removeBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired
}


export default connect((s, props) => {
  return {
    login: s.login.username,
    blog: s.blogs.find(b => b._id === props.id) }
}, {
  // likeBlog, removeBlog, commentBlog,
  notify })(BlogView)
