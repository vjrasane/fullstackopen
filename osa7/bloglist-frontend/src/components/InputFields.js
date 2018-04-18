import React from 'react'
import Input from './Input'
import PropTypes from 'prop-types'

class InputFields extends React.Component {
  constructor(props) {
    super(props)
    this.fields = this.props.fields
    const values = {}
    this.fields.forEach(f => values[f.toLowerCase()] = '')
    this.state = values
  }

  input = (event) => {
    this.setState({ [event.target.name.toLowerCase()]: event.target.value })
  }

  clear = () => {
    const values = {}
    this.fields.forEach(f => values[f.toLowerCase()] = '')
    this.setState(values)
  }

  render() {
    return (
      <table>
        <tbody>
          {this.fields.map(f =>
            <Input key={f} name={f} value={this.state[f.toLowerCase()]} onchange={this.input} />
          )}
        </tbody>
      </table>
    )
  }
}

InputFields.propTypes = {
  fields: PropTypes.array.isRequired,
}

export default InputFields
