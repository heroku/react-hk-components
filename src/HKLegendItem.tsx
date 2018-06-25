import * as React from 'react'
import { MalibuIcon } from '@heroku/react-malibu'

interface IHKLegendItemProps {
  onToggle: (...args: any[]) => any,
  show: boolean,
  value: number,
  label: string,
  className?: string,
}

export default class HKLegendItem extends React.PureComponent<IHKLegendItemProps, {}> {

  public render () {
    const { onToggle, value, label, className, show} = this.props

    let hoverProps = show ? 'bg-lightest-silver' : ''

    return (
      <a className='cursor-hand' onClick={() => this.handleLabelToggle(label)}>
        <div className={`hk-label ${className} flex flex-row br2 pa2 items-center ${hoverProps}`}>
            {show && (
              <div className='flex items-center'>
                <MalibuIcon name='confirm-16' fillClass='dark-gray' extraClasses='icon malibu-icon h1 w1 mr1 fill-dark-gray di'/>
                <svg width='7' height='31' viewBox={`0 0 7 31`} className='mr1'>
                  <rect x='0' y='0' height='100%' width='7' fill='#cfd736'/>
                </svg>
              </div>
            )}
            <div className='items-center'>
              <span className='db ma1 ttu f7 tracked'>{label}</span>
              <span className='db ma1 ttu b f6'>{value}</span>
            </div>
        </div>
      </a>)
  }

  handleLabelToggle = (label: string) => {
    if (this.props.onToggle) {
      this.props.onToggle(label)
    }
  }
}
