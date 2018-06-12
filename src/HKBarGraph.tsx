import * as React from 'react'

import * as d3scale from 'd3-scale'
import * as d3array from 'd3-array'

interface IBarGraphProps {
  data: number[],
  height: number,
  width: number,
}

interface IBarGraphState {
  data: number[],
  height: number,
  width: number,
  xScale: any,
  yScale: any,
}

export default class HKBarGraph extends React.Component<IBarGraphProps, IBarGraphState> {
  private node: SVGSVGElement | null

  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      height: props.height,
      width: props.width,
      xScale: d3scale.scaleBand()
                .domain(props.data)
                .range([0, props.width])
                .padding(0.1),
      yScale : d3scale.scaleLinear()
                .domain([0, d3array.max(props.data)])
                .range([0, props.height]),
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
      if (nextProps.data === prevState.data) {
        return null
      }

      return {
        data: nextProps.data,
        height: nextProps.height,
        width: nextProps.width,
        xScale: d3scale.scaleBand().domain(nextProps.data).range([0, nextProps.width]).padding(0.1),
        yScale : d3scale.scaleLinear()
                  .domain([0, d3array.max(nextProps.data)])
                  .range([0, nextProps.height]),
      }
  }

  public render () {
    const barWidth = 30
    const { data, height, width, yScale, xScale } = this.state

    const xAxis = (
      <g transform={`translate(0, ${height - barWidth} )`}>
      {data.map((d, i) =>
            <text x={xScale(d)} y={barWidth}> {d} </text>
      )}
    </g>)

    return (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          ref={node => this.node = node}>
            {data.map((d, i) => {
              return (
                <rect
                  x={xScale(d)} // x-axis top-left corner
                  y ={this.props.height - yScale(d) - barWidth} // y-axis top-left corner
                  height={yScale(d)}
                  width={xScale.bandwidth()}
                  fill="#cfd7e6"
                />)
            })}
            {xAxis}
        </svg>
    )
  }

}
