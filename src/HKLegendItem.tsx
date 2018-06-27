import * as React from 'react'

import { MalibuIcon } from '@heroku/react-malibu'
import * as classnames from 'classnames'

interface IHKLegendItemProps {
  zIndex: number,
  onToggle?: (...args: any[]) => any,
  show: boolean,
  value: number,
  label: string,
  className?: string,
  disableToggle?: boolean,
}

export default class HKLegendItem extends React.PureComponent<IHKLegendItemProps, {}> {
  public static defaultProps = {
    disableToggle: false,
  }

  public render () {
    const { className, disableToggle, label, show, value, zIndex } = this.props

    const legendIcon = show && (
      <div className='flex items-center'>
        <MalibuIcon name='confirm-16' fillClass='dark-gray' extraClasses='icon malibu-icon h1 w1 mr1 fill-dark-gray di'/>
        <svg width='7' height='31' viewBox={`0 0 7 31`} className='mr1'>
          <rect x='0' y='0' height='100%' width='7' fill='#79589f' fillOpacity={0.2 * (zIndex + 1)}/>
        </svg>
      </div>
    )

    return (
      <a className='cursor-hand' onClick={disableToggle ? undefined : this.handleOnClick}>
        <div className={classnames('hk-label', className, 'flex flex-row br2 pa2 mh2 items-center', { 'bg-lightest-silver': show })}>
            {legendIcon}
            <div className='items-center'>
              <span className='db ma1 ttu f7 tracked'>{label}</span>
              <span className='db ma1 ttu b f6'>{value}</span>
            </div>
        </div>
      </a>
    )
  }

  public handleOnClick = () => {
    const { onToggle, label } = this.props
    if (!onToggle) {
      return null
    }

    onToggle(label)
  }
}
