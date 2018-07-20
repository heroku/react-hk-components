import * as React from 'react'

import { prettier } from './helpers'

interface IGridProps {
  data: any,
  height: number,
  width: number,
  yInterval?: any,
  xInterval?: any,
  showXAxis?: boolean,
  showYAxis?: boolean,
  xScale: any,
  yScale: any,
}

export default class HKGrid extends React.PureComponent<IGridProps, {}> {
  public static defaultProps = {
    showXAxis: true,
    showYAxis: true,
    xInterval: false,
    yInterval: false,
  }

  public render () {
    const { width, xInterval, showYAxis, yScale } = this.props

    const yTicks = 5
    const gridProps = {
      stroke: '#96a3b6',
      strokeOpacity: '0.3',
      strokeWidth: '0.5',
    }

    const gridX = !!xInterval && yScale.ticks(yTicks).map((d,i) => (
      <g key={i}>
        <line x1='0' y1={yScale(d) + 15} x2={width} y2={yScale(d) + 15} {...gridProps} />
        {showYAxis && <text x={-3} y={yScale(d) + 15} textAnchor='end' className='f7 fill-gray'> {prettier(d)} </text>}
      </g>
    ))

    return (
      <g>
        {gridX}
      </g>
    )
  }
}
