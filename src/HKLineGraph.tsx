import * as React from 'react'

import * as d3array from 'd3-array'
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'
import * as _ from 'lodash'
import * as moment from 'moment'

import { default as HKGrid } from './HKGrid'
import { default as HKLine } from './HKLine'

interface ILineGraphProps {
  data: any, // Assumes the data comes in the format [{time, value},...]
  height: number,
  width: number,
  labels: string[],
  onHover: any,
  toggleInfo: object,
}

interface ILineGraphState {
  data: any, // Points for graph
  measurements: any, // Cleansed data
  height: number,
  width: number,
  hoverIndex: number,
  idx: number,
  area: any,
  line: any,
  xScale: any,
  yScale: any,
}

export default class HKLineGraph extends React.PureComponent<ILineGraphProps, ILineGraphState> {
  private ref: SVGSVGElement | null

  constructor (props) {
    super(props)

    this.state = {
      height: props.height,
      width: props.width,

      hoverIndex: -1,
      idx: -1, // For hovering animations, will re-render everytime any hover related state changes
      /* Initializes in getDerivedStateFromProps**/

      data: null,
      measurements: null,

      area: null,
      line: null,
      xScale: null,
      yScale: null,
    }
  }

  // setState based on new props passed
  public static getDerivedStateFromProps (newProps, prevState) {

    if (['data', 'width', 'height'].every((o) => newProps[o] === prevState[o])) {
      return null
    }

    const { width, height, data } = newProps
    const values = _.flatMap(data.map((d) => d[1]))

    const formatData = (dataSet) => {
      if (!dataSet) {
        return null
      }
      return dataSet.map((d) => ({
        x: moment.utc(d[0]).toDate(),
        y: d[1].map((v) => _.isFinite(v) ? v : 0),
      }))
    }

    // Cleanse data into valid format(date and values)
    // Make sure our coordinates are sorted by date asscending
    const measurements = formatData(data)
                  .sort((a, b) => moment(a.x).diff(moment(b.x)))

    // Domain of x coordinates (date)
    const timeExtent = [
      _.head(measurements).x,
      _.last(measurements).x,
    ]

    // Domain of y coordinates (value)
    const valueExtent = d3array.extent(values)

    const xScale = d3scale.scaleTime()
                    .domain(timeExtent)
                    .range([0, width])

    const yScale = d3scale.scaleLinear()
     // multily by 5% so we can have some spacing b/w the last point and the top of the graph
                    .domain([valueExtent[0] < 0 ? valueExtent[0] : 0, valueExtent[1] * 1.05])
                    .range([height, 0])

    const line = d3shape.line()
                  .x((d) => xScale(d.x))
                  .y((d) => yScale(d.y))
                  .curve(d3shape.curveStepBefore)

    const area = d3shape.area()
                  .x((d) => xScale(d.x))
                  .y0(yScale(valueExtent[0] < 0 ? yScale(valueExtent) : 0))
                  .y1((d) => yScale(d.y))
                  .curve(d3shape.curveStepBefore)
    return {
      data,
      measurements,

      height,
      width,

      area,
      line,
      xScale,
      yScale,
    }
  }

  public handleMouseMove = (e) => {
    const { measurements, xScale } = this.state

    if (!this.ref) {
      return null
    }

    // TODO: Optimize rendering performance here
    const hoverIndex = e.clientX - this.ref.getBoundingClientRect().left
    const bisectX = d3array.bisector((d) => d.x).left
    const newIdx = bisectX(measurements, xScale.invert(hoverIndex))
    this.setState({ idx: newIdx, hoverIndex })

    if (measurements[newIdx]) {
      const values = measurements[newIdx].y // Remember to figure out empty case
      this.props.onHover(values)
    }
  }

  public handleMouseLeave = (e) => this.setState({ hoverIndex: -1, idx: -1 })

  public render () {
    const { height, width, yScale, line, area, measurements, idx, hoverIndex } = this.state
    const { toggleInfo, labels } = this.props
    const isHovering = hoverIndex !== -1

    const valueIndexes: number[] = []
    labels.forEach((label, i) => {
      if (toggleInfo[`${label}`]) {
        valueIndexes.push(i)
      }
    })

    const timeseries = valueIndexes.map((i) => {
      const lineProps = {
        area,
        data: measurements.map((m) => ({
          x: m.x,
          y: m.y[i],
        })),
        line,
      }
      return <HKLine key={i} {...lineProps} />
    })

    const indicatorPoint = valueIndexes.map((v,i) => measurements[idx] ? (
      <circle
        key={i}
        className='indicatorPoint'
        cx={hoverIndex}
        cy={yScale(measurements[idx].y[i])}
        r={2}
      />) : null)

    const indicator = isHovering && (
      <g>
        <line x1={hoverIndex} y1='0' x2={hoverIndex} y2={height} stroke='#79589f' strokeWidth='1' />
        {indicatorPoint}
      </g>)

    return (
        <svg
          preserveAspectRatio='none'
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          ref={(ref) => this.ref = ref}
          className='br0 ba b--silver overflow-hidden'
        >
          {indicator}
          {timeseries}
        </svg>
    )
  }
}
