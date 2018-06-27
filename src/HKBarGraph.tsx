import * as React from 'react'

import * as d3array from 'd3-array'
import * as d3scale from 'd3-scale'

interface IBarGraphProps {
  data: number[],
  height: number,
  onHover: (value: number) => void,
  width: number,
}

interface IBarGraphState {
  data: number[],
  height: number,
  width: number,

  hoverIndex: number,
  xScale: any,
  yScale: any,
}

export default class HKBarGraph extends React.PureComponent<IBarGraphProps, IBarGraphState> {
  private ref: SVGSVGElement | null

  constructor (props) {
    super(props)

    this.state = {
      data: [],
      height: 0,
      width: 0,

      hoverIndex: -1,
      xScale: null,
      yScale : null,
    }
  }

  public static getDerivedStateFromProps (newProps, prevState) {
    if (['data', 'width', 'height'].every((o) => newProps[o] === prevState[o])) {
      return null
    }

    const { data, height, width } = newProps
    const valueExtent = d3array.extent(data)

    return {
      data,
      height,
      width,
      xScale: d3scale.scaleBand()
                .domain(data.map((d,i) => i))
                .range([0, width])
                .padding(0.1),
      yScale : d3scale.scaleLinear()
                .domain([valueExtent[0] < 0 ? valueExtent[0] : 0, valueExtent[1] * 1.05])
                .range([0, height]),
    }
  }

  public handleMouseMove = (e) => {
    if (!this.ref || !this.props.onHover) {
      return null
    }

    const { data, width } = this.state
    const hoverIndex = e.clientX - this.ref.getBoundingClientRect().left
    const interpolateIndex = hoverIndex * data.length / width
    const index = Math.min(interpolateIndex, data.length - 1)
    const value = data[Math.floor(index)]

    this.props.onHover(value)
  }

  public handleMouseLeave = (e) => {
    const { onHover, data } = this.props
    if (onHover) {
      onHover(d3array.max(data))
    }
  }

  public render () {
    const { data, height, width, yScale, xScale } = this.state

    const bars = data.map((d, i) => (
      <rect
        key={i}
        x={xScale(i)} // x-axis top-left corner
        y={height - yScale(d)} // y-axis top-left corner
        height={yScale(d)}
        width={xScale.bandwidth()}
        fill='#cfd7e6'
        className='dim cursor-hand'
      />
    ))

    return (
        <svg
          preserveAspectRatio='none'
          width={width}
          height={height}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          viewBox={`0 0 ${width} ${height}`}
          ref={(ref) => this.ref = ref}
          className='br0 ba b--silver'
        >
          {bars}
        </svg>
    )
  }
}
