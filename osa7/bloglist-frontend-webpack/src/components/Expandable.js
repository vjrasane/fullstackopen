import React from 'react'
import PropTypes from 'prop-types'

class Expandable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  display = () => {
    return { display: (this.state.visible ? '' : 'none') }
  }

  toggle = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    return (
      <div className="expandable" style={this.display()}>
        {this.props.children}
      </div>
    )
  }
}

Expandable.propTypes = {
  children: PropTypes.object
}

export default Expandable
