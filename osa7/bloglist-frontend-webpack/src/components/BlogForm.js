import React from 'react'
import InputFields from './InputFields'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogs'
import { notify } from '../reducers/notifs'

class BlogForm extends React.Component {
  submit = async () => {
    const title = this.inputs.state.title
    const author = this.inputs.state.title

    await this.props.createBlog(this.inputs.state)
    this.props.notify(`added new blog '${title}' by ${author}`, 'success')
    this.inputs.clear()
    this.togglable.toggle()
  }

  render() {
    return (
      <div>
        <Togglable
          expandLabel="Submit Blog"
          collapseLabel="Cancel"
          ref={c => this.togglable = c}>
          <InputFields
            fields={['Title', 'Author', 'Url']}
            ref={c => this.inputs = c}/>
          <button onClick={this.submit}>Submit</button>
        </Togglable>
      </div>
    )
  }
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default connect(null, { createBlog, notify })(BlogForm)
