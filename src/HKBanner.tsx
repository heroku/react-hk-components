import { MalibuIcon } from '@heroku/react-malibu'
import * as React from 'react'
import {
  default as HKButton,
  Type as ButtonType,
} from './HKButton'

export enum BannerType {
  generic = 'generic',
  info = 'info',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

interface IBannerProps {
  buttonText?: string,
  title?: string,
  children: JSX.Element | JSX.Element[] | string,
  icon: string,
  onClick?: () => void,
  type: BannerType,
}

export default class HKBanner extends React.Component<IBannerProps> {
  private typeMap = new Map<BannerType, ButtonType>([
    [BannerType.generic, ButtonType.Secondary],
    [BannerType.info, ButtonType.Info],
    [BannerType.success, ButtonType.Success],
    [BannerType.warning, ButtonType.Warning],
    [BannerType.danger, ButtonType.Danger],
  ])

  private colorMap = {
    danger: 'red',
    generic: 'dark-gray',
    info: 'blue',
    success: 'green',
    warning: 'orange',
  }

  public render () {
    const { buttonText, children, type, icon, title } = this.props
    let button
    if (buttonText) {
      button = <HKButton type={this.typeMap.get(type)} onClick={this.handleClick} className='flex-none'>{buttonText}</HKButton>
    }

    return (
      <div className={`hk-banner--${type} flex items-center`}>
        <MalibuIcon name={icon} size={24} fillClass={this.colorMap[type]} extraClasses='mr2 flex-none' />
        <div className='flex-auto'>
          {title && <div className='b'>{title}</div>}
          {children}
        </div>
        {button}
      </div>
    )
  }

  private handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }
}
