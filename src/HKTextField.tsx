import classnames from 'classnames'
import * as React from 'react'

interface ITextFieldProps {
  className?: string,
  autoSelect?: boolean,
  disabled?: boolean,
  name?: string,
  value?: string,
  placeholder?: string,
  type?: string,
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void,
  readOnly?: boolean
}

const defaultProps = {
  onChange: () => void(0),
  type: 'text',
}

const HKTextField: React.FunctionComponent<ITextFieldProps> = (props) => {
  const { placeholder, value, type, onChange, name, readOnly, disabled, autoSelect, className } = props
  const purpleClass = `hk-input${readOnly ? '--read-only' : ''}`
  const inputClass = classnames(purpleClass, className)

  const handleFocus = (e) => {
    if (autoSelect) {
      e.target.select()
    }
  }
  return <input onFocus={handleFocus} readOnly={readOnly} disabled={disabled} name={name} onChange={onChange} value={value} type={type} className={inputClass} placeholder={placeholder} />
}

HKTextField.defaultProps = defaultProps

export default HKTextField
