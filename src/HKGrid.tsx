import * as React from 'react'

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

export default class HKGrid extends React.Component<IGridProps, {}> {
  public static defaultProps = {
    showXAxis: true,
    showYAxis: true,
    xInterval: false,
    yInterval: false,
  }

  public shouldComponentUpdate (nextProps, nextState) {
    return Object.keys(['width', 'height']).some((o) => this.props[o] !== nextProps[o])
  }

  public render () {
    const { width, xInterval, showYAxis, yScale } = this.props

    const xTicks = 5 // TODO: make this dynamic

    const gridProps = {
      stroke: '#96a3b6',
      strokeOpacity: '0.3',
      strokeWidth: '0.5',
    }

    const gridX = !!xInterval && yScale.ticks(xTicks).map((d,i) => (
      <g key={i}>
        <line x1='0' y1={yScale(d)} x2={width} y2={yScale(d)} {...gridProps} />
        {showYAxis && <text x={40} y={yScale(d)} textAnchor='end' className='f7 fill-gray'> {d} </text>}
      </g>
    ))

    return (
        <g>
          {gridX}
        </g>
    )
  }
}
