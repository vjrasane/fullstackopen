import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ name, value, onchange }) => {
  return (
    <tr className={'inputrow ' + name.toLowerCase()}>
      <td>{name}:</td>
      <td><input
        className={'input ' + name.toLowerCase()}
        name={name.toLowerCase()}
        value={value}
        onChange={onchange}/></td>
    </tr>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired
}

export default Input
