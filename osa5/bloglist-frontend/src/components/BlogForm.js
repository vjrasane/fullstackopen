import React from 'react'
import InputFields from './InputFields'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
  }

  input = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  clear = () => {
    this.setState({ title: '', author: '', url: '' })
  }

  submit = async (event) => {
    const blog = await blogService.create(this.state)
    this.clear()
    this.props.onsubmit(blog)
  }

  render() {
    return (
      <div>
        <InputFields
          fields={['Title', 'Author', 'Url']}
          state={this.state}
          input={this.input}/>
        <button onClick={this.submit}>Submit</button>
      </div>
    )
  }
}

BlogForm.propTypes = {
  onsubmit: PropTypes.func.isRequired
}

export default BlogForm;
