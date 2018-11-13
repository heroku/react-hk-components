import * as React from 'react'

export enum Type {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Success = 'success',
}

interface IButtonProps {
  async?: boolean,
  children: React.ReactNode,
  className?: string,
  'data-testid'?: string,
  disabled?: boolean,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void,
  small?: boolean,
  title?: string,
  type?: Type,
  value?: string,
}

const HKButton = (props: IButtonProps) => {
  const { onClick, async = false, title, value, children, disabled = false, type = 'secondary', small = false, className = '' } = props
  const testId = props['data-testid']
  const conditionalTestId = testId && {
    'data-testid': testId,
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

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
    <button type='button' {...conditionalTestId} className={buttonClass} disabled={disabled} onClick={handleClick} title={title} value={value || title}> {children} </button>
  )
}

HKButton.defaultProps = {
  async: false,
  className: '',
  disabled: false,
  small: false,
  type: 'secondary',
}

export default HKButton
