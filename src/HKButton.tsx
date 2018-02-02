import * as React from 'react'

enum Type {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
}

interface IButtonProps {
  async?: boolean,
  children: JSX.Element,
  className?: string,
  disabled?: boolean,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void,
  small?: boolean,
  title?: string,
  type?: Type,
  value?: string,
}

export default class HKButton extends React.Component<IButtonProps, {}> {
  public static defaultProps = {
    async: false,
    className: '',
    disabled: false,
    small: false,
    type: 'secondary',
  }

  public render () {
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

  private handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
}
