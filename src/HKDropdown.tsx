import { MalibuIcon } from '@heroku/react-malibu'
import classnames from 'classnames'
import * as React from 'react'

import {
  Type,
  default as HKButton,
} from './HKButton'

interface IDropdownProps {
  align?: string, // align dropdown component anchoring button
  children?: JSX.Element | JSX.Element[] | string,
  className?: string, // dropdown button styling
  contentClassName?: string, // dropdown content styling
  disabled?: boolean,
  title?: string,
}

interface IDropdownState {
  showDropdown: boolean,
}

export default class HKDropdown extends React.Component<IDropdownProps> {

  public state = {
    showDropdown: false,
  }

  public static defaultProps = {
    disabled: false,
  }

  public handleDropdown = () => this.setState({ showDropdown: !this.state.showDropdown })

  public render () {
    const { align, children, disabled, title, className, contentClassName } = this.props
    const { showDropdown } = this.state
    const alignDropdown = align ? `hk-dropdown--right` : `hk-dropdown`
    const caret = <MalibuIcon name='caret-16' size={16} fillClass='fill-purple' />
    const dropdownTitle = title ? [`${title}`, caret] : caret

    return (
      <div className='relative dib'>
        <HKButton className={classnames({ 'ph1': !title }, className)} type={Type.Secondary} disabled={!disabled} onClick={this.handleDropdown}>
          {dropdownTitle}
        </HKButton>
        <span onClick={this.handleDropdown}>
          {
            showDropdown &&
            (<ul className={classnames(alignDropdown, contentClassName)}>
              {children}
            </ul>)
          }
        </span>
      </div>
    )
  }
}
