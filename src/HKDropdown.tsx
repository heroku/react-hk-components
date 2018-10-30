import { MalibuIcon } from '@heroku/react-malibu'
import classnames from 'classnames'
import * as React from 'react'
import ClickOutside from 'react-click-outside'
import { Manager, Popper, Reference } from 'react-popper'

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
    const popperPlacement = align === Align.Right ? 'bottom-end' : 'bottom-start'
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className='relative dib' ref={ref}>
              <HKButton onClick={this.handleDropdown} data-testid={`${name}-dropdown-button`} className={classnames({ ph1: !title }, className)} type={Type.Secondary} disabled={disabled}>
                {title}
                <MalibuIcon key='icon' name='caret-16' size={16} fillClass='fill-purple' extraClasses={classnames({ pl1: title })} />
              </HKButton>
            </div>
          )}
        </Reference>
        {
          showDropdown && (
            <ClickOutside onClickOutside={this.handleDropdown}>
              <Popper placement={popperPlacement}>
                {({ ref, style, placement }) => (
                  <div className='z-max' onClick={this.handleContentClick} data-testid={`${name}-dropdown-content`} ref={ref} style={style} data-placement={placement}>
                    <ul className={classnames(contentClassName, 'list br1 pl0 pv1 mv1 shadow-outer-2 bg-white')}>
                      {children}
                    </ul>
                  </div>
                )}
              </Popper>
            </ClickOutside>
          )
        }
      </Manager>
    )
  }
}
