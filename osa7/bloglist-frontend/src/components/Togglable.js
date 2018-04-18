import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  display = (invert) => {
    const vis = this.state.visible ? 1 : 0
    const inv = invert ? 1 : 0
    return { display: (vis ^ inv  ? '' : 'none') }
  }

  toggle = () => {
    // console.log('toggling')
    this.setState({ visible: !this.state.visible })
  }

  render() {
    return (
      <div>
        <div style={this.display(true)}>
          <button className="button expand" onClick={this.toggle}>
            {this.props.expandLabel}
          </button>
        </div>
        <div style={this.display(false)}>
          {this.props.children}
          <button className="button collapse" onClick={this.toggle}>
            {this.props.collapseLabel}
          </button>
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  expandLabel: PropTypes.string.isRequired,
  collapseLabel: PropTypes.string.isRequired,
}

export default Togglable
