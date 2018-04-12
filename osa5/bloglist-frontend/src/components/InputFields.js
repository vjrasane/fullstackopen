import React from 'react'
import Input from './Input'
import PropTypes from 'prop-types'

const InputFields = ({ fields, state, input }) => {
  return (
    <table>
      <tbody>
        {fields.map(f =>
          <Input key={f} name={f} value={state[f.toLowerCase()]} onchange={input} />
        )}
      </tbody>
    </table>
  )
}

InputFields.propTypes = {
  fields: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  input: PropTypes.func.isRequired
}

export default InputFields
