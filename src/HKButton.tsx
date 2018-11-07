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
  disabled?: boolean,
  forwardedRef: React.RefForwardingComponent<HTMLButtonElement, any>,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void,
  small?: boolean,
  title?: string,
  type?: Type,
  value?: string,
}

function refHOC (Component) {
  return React.forwardRef<any, any>((props, ref) => {
    return <Component {...props} forwardedRef={ref} />
  })
}

const HKButton = (props: IButtonProps) => {
  const { onClick, forwardedRef, async = false, title, value, children, disabled = false, type = 'secondary', small = false, className = '' } = props
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
    <button type='button' ref={forwardedRef} className={buttonClass} disabled={disabled} onClick={handleClick} title={title} value={value || title}> {children} </button>
  )
}

export default refHOC(HKButton)
