import * as React from 'react'

import * as d3scale from 'd3-scale'
import * as d3axis from 'd3-axis'

interface IGridProps {
  coordinates: any,
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

  static defaultProps = {
    xInterval: false,
    yInterval: false,
    showXAxis: false,
    showYAxis: false,
  }

  public shouldComponentUpdate(nextProps, nextState) {
      return Object.keys(['width', 'height']).some(o => this.props[o] !== nextProps[o])
  }

  public render () {
    const { height, width, xInterval, yInterval, showXAxis, showYAxis, xScale, yScale } = this.props

    const x = d3scale.scaleLinear().domain([0, height])
    const y = d3scale.scaleLinear().domain([0, width])
    const xTicks = width / xInterval // denotes the number of lines wanted
    const yTicks = height / yInterval

    const gridProps = {
      'stroke': 'black',
      'strokeWidth': '0.2',
      'strokeOpacity': '0.4'
    }

    const axisProps = {
      'stroke': 'black',
      'strokeWidth': '1',
      'storkeOpacity': '0.4'
    }

    const gridX = !!xInterval && x.ticks(xTicks).map((d,i) => {
      return (
        <g>
        <line  x1='0' y1={d} x2={height} y2={d} stroke='black' strokeWidth='0.2' strokeOpacity='0.4' />
          <text x={0} y={height - d} textAnchor='end' className='f7 fill-gray'> {d} </text>
        </g>
      )
    })

    const gridY = !!yInterval && yScale.ticks(yTicks).map((d,i) => {
      return (
        <line  x1={d} y1='0' x2={d} y2={width} stroke='black' strokeWidth='0.2' strokeOpacity='0.4' />
      )
    })

    const yAxis = showYAxis && (
      <g className='yAxis'>
          <line x1='0' y1='0' x2='0' y2={height} stroke='black' strokeWidth='1' strokeOpacity='0.4' />
          {yScale.ticks(xTicks).map((d, i) =>
            {
              return (
            <text x={20} y={i * 6} textAnchor='end' className='f7 fill-gray'> </text>
          )})}
      </g>
    )

    return (
        <g className='grid'>
          {gridX}
          {gridY}
          {yAxis}
        </g>
    )
  }
}
