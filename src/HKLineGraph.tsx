import * as React from 'react'

import * as _ from 'lodash'
import * as d3scale from 'd3-scale'
import * as d3array from 'd3-array'
import * as d3shape from 'd3-shape'
import * as Immutable from 'immutable'
import * as moment from 'moment'

import { default as HKGrid } from './HKGrid'

interface ILineGraphProps {
  data: any, //Assume the data comes in the format [{time, value},...]
  height: number,
  width: number,
  minValue?: any,
  maxValue?: any,
}

interface ILineGraphState {
  height: number,
  width: number,
  hoverIndex: number,
  xScale: any,
  yScale: any,
  x: number,
  line: any,
  ref: any, //reference for the svg for hover animations
  coordinates: any, // points for graph
  // minValue: number,
  // maxValue: number,
}

export default class HKLineGraph extends React.Component<ILineGraphProps, ILineGraphState> {
  private ref: SVGSVGElement | null

  public static defaultProps = {
    minValue: 0,
    maxValue: 100,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...this.prepare(props),
      hoverIndex: 0,
      ref: null,
      x: -1,
    }
  }

  /* We only want to rerender if either
     - hoverIndex changes
     - props changes
  */
  public shouldComponentUpdate(nextProps, nextState) {
   const propsChanged = Object.keys(this.props)
                        .some(o => this.props[o] !== nextProps[o])
   const hoverChanged = this.state.hoverIndex !== nextState.hoverIndex
   const refChanged = this.state.ref !== nextState.ref
   const xChanged = this.state.x !== nextState.x

   return propsChanged || hoverChanged || refChanged || xChanged
  }

  public componentDidMount() {
    this.setState({ ref: this.ref })
  }

  public componentDidUpdate(prevProps) {
    const propsChanged = Object.keys(prevProps).some(o => this.props[o] !== prevProps[o])
    if (propsChanged) {
      this.setState(this.prepare(this.props))
    }
  }

  private sortByDate = (a,b) => moment(a.x).isAfter(moment(b.x)) // sort by date asscending

  // Given values in time, returns measurements for timeseries
  private getTimeMeasurements = data => {
    if (!data) {
      return null
    }

    return data.map(d => ({
        x: moment.utc(d[0]).toDate(),
        y: _.isFinite(d[1]) ? d[1] : 0
      }))
  }

  // TODO: Implement case where time series xvalues are not date but numeric
  private prepare = ({ data, width, height }) => {

    const coordinates = this.getTimeMeasurements(data).sort(this.sortByDate)

    const timeExtent = [
      _.head(coordinates).x,
      _.last(coordinates).x
    ]

    const valueExtent = d3array.extent(coordinates.map(d => d.y))

    // if (minValue !== undefined) {
    //   valueExtent[0] = minValue
    // }
    //
    // if (maxValue !== undefined) {
    //   valueExtent[1] = maxValue
    // }

    const xScale = d3scale.scaleTime()
                    .domain(timeExtent)
                    .range([0, width])

    const yScale = d3scale.scaleLinear()
                    .domain(valueExtent)
                    .range([height, 0])

    const line = d3shape.line()
                  .x(d => xScale(d.x))
                  .y(d => yScale(d.y))
                  .curve(d3shape.curveStepAfter)
    return {
      width,
      height,
      xScale,
      yScale,
      line,
      coordinates,
      // minValue: minValue | valueExtent[0],
      // maxValue: maxValue | valueExtent[1],
    }
  }

  public handleMouseMove = (e) => {
    const x = this.state.xScale
                .invert(e.clientX - this.state.ref.getBoundingClientRect().left)
    this.setState({ x: e.clientX - this.state.ref.getBoundingClientRect().left - 20 })
    const bisectDate = d3array.bisector(d => d).left
    const idx = bisectDate((this.state.coordinates.map(d => d.x)), x)
  }

  public handleMouseLeave = (e) => {

  }

  public render () {
    const { height, width, xScale, yScale, line, coordinates } = this.state

    return (
        <svg
          width={width}
          height={height}
          className="pa4"
          viewBox={`0 0 ${width} ${height}`}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          ref={ref => this.ref = ref}>
          <line  x1={this.state.x} y1='0' x2={this.state.x} y2={height} stroke='black' strokeWidth='0.2' strokeOpacity='0.4' />
          <path d={line(coordinates)} fill='none' stroke='#79589f' strokeWidth='1.5'/>
          <HKGrid
            {...this.state}
            xInterval={50}
            showYAxis={true}
          />
        </svg>
    )
  }

}
