import { MalibuIcon } from '@heroku/react-malibu'
import classnames from 'classnames'
import * as React from 'react'

import {
  default as HKButton,
  Type,
} from './HKButton'

export enum Align {
  Left = 'left',
  Right = 'right',
}

interface IDropdownProps {
  align?: Align, // align dropdown component anchoring button
  children?: JSX.Element | JSX.Element[] | string,
  className?: string, // dropdown button styling
  closeOnClick?: boolean, // hide dropdown content after onClick in dropdown content
  contentClassName?: string, // dropdown content styling
  disabled?: boolean,
  name?: string, // name of the dropdown, used for testing in testID
  title?: string,
}

interface IDropdownState {
  showDropdown: boolean,
}

export default class HKDropdown extends React.Component<IDropdownProps, IDropdownState> {
  public static defaultProps = {
    closeOnClick: true,
    disabled: false,
    name: 'hkdropdown',
  }

  public state = {
    showDropdown: false,
  }

  public handleDropdown = () => this.setState((prevState) => ({ showDropdown: !prevState.showDropdown }))

  public handleContentClick = () => this.props.closeOnClick && this.setState({ showDropdown: false })

  public render () {
    const { align, children, className, contentClassName, disabled, name, title } = this.props
    const { showDropdown } = this.state
    const alignDropdown = align ? `hk-dropdown--${align}` : `hk-dropdown`
    return (
      <div className='relative dib'>
        <HKButton data-testid={`${name}-dropdown-button`} className={classnames({ ph1: !title }, className)} type={Type.Secondary} disabled={disabled} onClick={this.handleDropdown}>
          {title}
          <MalibuIcon key='icon' name='caret-16' size={16} fillClass='fill-purple' extraClasses={classnames({ pl1: title })} />
        </HKButton>
        <div data-testid={`${name}-dropdown-content`} onClick={this.handleContentClick}>
          {
            showDropdown &&
            (<ul className={classnames(alignDropdown, contentClassName)}>
              {children}
            </ul>)
          }
        </div>
      </div>
    )
  }
}
