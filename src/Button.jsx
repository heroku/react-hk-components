import React from 'react'
import PropTypes from 'prop-types'

export default class Button extends React.Component {
  static propTypes = {
    async: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    small: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info']),
    value: PropTypes.string,
  }

  static defaultProps = {
    async: false,
    className: '',
    disabled: false,
    small: false,
    type: 'secondary',
  }

  handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  render () {
    const { async, disabled, small, type, children, className, title, value } = this.props
    let buttonClass = 'hk-button'
    if (async) {
      buttonClass += '--async'
    } else {
      const disabledClass = disabled ? 'disabled-' : ''
      const smallClass = small ? '-sm' : ''
      buttonClass += `${smallClass}--${disabledClass}${type}`
    }
    if (className) {
      buttonClass += ` ${className}`
    }
    return (
      <button type='button' className={buttonClass} disabled={disabled} onClick={this.handleClick} title={title} value={value || title}> {children} </button>
    )
  }
}
