import { MalibuIcon } from '@heroku/react-malibu'
import classnames from 'classnames'
import * as React from 'react'

import {
  default as HKButton,
  Type,
} from './HKButton'

interface IDropdownProps {
  align?: string, // align dropdown component anchoring button
  children?: JSX.Element | JSX.Element[] | string,
  className?: string, // dropdown button styling
  hideContentOnClick?: boolean, // hide dropdown content after onClick in dropdown content
  contentClassName?: string, // dropdown content styling
  disabled?: boolean,
  title?: string,
}

interface IDropdownState {
  showDropdown: boolean,
}

export default class HKDropdown extends React.Component<IDropdownProps, IDropdownState> {
  public static defaultProps = {
    disabled: false,
    hideContentOnClick: true,
  }

  public state = {
    showDropdown: false,
  }

  public handleDropdown = () => this.setState({ showDropdown: !this.state.showDropdown })

  public handleContentClick = () => this.props.hideContentOnClick && this.handleDropdown()

  public render () {
    const { align, children, className, contentClassName, disabled, title } = this.props
    const { showDropdown } = this.state
    const alignDropdown = align ? `hk-dropdown--${align}` : `hk-dropdown`
    return (
      <div className='relative dib'>
        <HKButton className={classnames({ ph1: !title }, className)} type={Type.Secondary} disabled={disabled} onClick={this.handleDropdown}>
          {title}
          <MalibuIcon key='icon' name='caret-16' size={16} fillClass='fill-purple' extraClasses={classnames({ pl1: title })} />
        </HKButton>
        <span onClick={this.handleContentClick}>
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
