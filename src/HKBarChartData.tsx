import * as React from 'react'

import * as d3array from 'd3-array'
import * as d3scale from 'd3-scale'
import * as _ from 'lodash'

import { colours } from './constants'
import { getMaxValues } from './helpers'

interface IBarChartDataProps {
  data: any,
  height: number,
  labels: any,
  onHover: (values: number[], keys: number[]) => void,
  toggleInfo: object,
  width: number,
}

interface IBarChartDataState {
  data: any,
  height: number,
  keys: number[],
  width: number,

  hoverIndex: number,
  x0Scale: any,
  x1Scale: any,
  yScale: any,
}

export default class HKBarChartData extends React.PureComponent<IBarChartDataProps, IBarChartDataState> {
  private ref: SVGSVGElement | null

  constructor (props) {
    super(props)

    this.state = {
      data: null,
      height: 0,
      keys: [],
      width: 0,

      hoverIndex: -1,
      x0Scale: null,
      x1Scale: null,
      yScale : null,
    }
  }

  public static getDerivedStateFromProps (newProps, prevState) {
    if (['data', 'width', 'height', 'toggleInfo'].every((o) => newProps[o] === prevState[o])) {
      return null
    }

    const { data, height, width, toggleInfo } = newProps

    // keys: an array of the indexes from bar chart data that are toggled on
    const keys = Object.keys(toggleInfo).filter((k) => toggleInfo[k]).map(Number)
    const shownData = data.map((rowData) => rowData.filter((colData, i) => _.includes(keys, i)))

    const minValues = d3array.min(shownData, ((arr) => d3array.min(arr)))
    const maxValues = d3array.max(shownData, ((arr) => d3array.max(arr)))

    const x0Scale = d3scale.scaleBand()
                      .range([0, width])
                      .domain(shownData.map((d,i) => i))
                      .paddingInner(0.1)

    const x1Scale = d3scale.scaleBand()
                      .range([0, x0Scale.bandwidth()])
                      .domain(shownData[0].map((d,i) => i))
                      .padding(0.08)

    const yScale = d3scale.scaleLinear()
                    .rangeRound([0, height])
                    .domain([Math.min(0, minValues), maxValues * 1.05])

    return {
      data: shownData,
      height,
      keys,
      width,

      x0Scale,
      x1Scale,
      yScale,
    }

  }

  public handleMouseMove = (e) => {
    if (!this.ref || !this.props.onHover) {
      return null
    }

    const { data, keys, width } = this.state
    const hoverIndex = e.clientX - this.ref.getBoundingClientRect().left
    const interpolateIndex = hoverIndex * data.length / width
    const index = Math.min(interpolateIndex, data.length - 1)
    const values = data[Math.floor(index)]
    this.props.onHover(values, keys)
  }

  public handleMouseLeave = (e) => {
    const { onHover } = this.props
    const { data, keys } = this.state

    if (onHover) {
      onHover(getMaxValues(data, 'bar'), keys)
    }
  }

  public createBar = (rowIdx, colVal, colIdx) => {
    const { height, keys, x0Scale, x1Scale, yScale } = this.state
    return (
      <rect
        key={`row${rowIdx}-column${colIdx}`}
        x={x0Scale(rowIdx) + x1Scale(colIdx)} // x-axis top-left corner
        y={height - yScale(colVal)} // y-axis top-left corner
        height={yScale(colVal)}
        width={x1Scale.bandwidth()}
        fill={colours[keys[colIdx]]}
        className='dim'
      />)
  }

  public render () {

    const { data, height, width } = this.state
    const bars = data.map((rowData, rowIdx) => (
      <g key={`row-${rowIdx}`} className='dim'>
        {rowData.map((colVal, colIdx) => this.createBar(rowIdx, colVal, colIdx))}
      </g>
    ))

    return (
      <svg
        preserveAspectRatio='none'
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        ref={(ref) => this.ref = ref}
        className='br0 ba b--silver'
      >
        {bars}
      </svg>
    )
  }
}
