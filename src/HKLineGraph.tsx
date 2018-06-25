import * as React from 'react'

import * as _ from 'lodash'
import * as d3scale from 'd3-scale'
import * as d3array from 'd3-array'
import * as d3shape from 'd3-shape'
import * as moment from 'moment'

import { default as HKGrid } from './HKGrid'
import { default as HKLine } from './HKLine'

interface ILineGraphProps {
  height: number,
  width: number,
  data: any, // Assumes the data comes in the format [{time, value},...]
  onHover: any,
  toggleInfo: any,
  labels: string[],
}

interface ILineGraphState {
  height: number,
  width: number,
  hoverIndex: number,
  idx: number,
  xScale: any,
  yScale: any,
  line: any,
  area: any,
  data: any, // Points for graph
  measurements: any, // Cleansed data
  ref: any, // Reference for the svg for hover animations
}

export default class HKLineGraph extends React.Component<ILineGraphProps, ILineGraphState> {
  private ref: SVGSVGElement | null

  constructor(props) {
    super(props)

    this.state = {
      height: props.height,
      width: props.width,
      hoverIndex: -1,
      idx: -1, // For hovering animations, will re-render everytime any hover related state changes
      ref: null,  // Initializes in componentDidMount
      /* Initializes in getDerivedStateFromProps**/
      data: null,
      measurements: null,
      xScale: null,
      yScale: null,
      line: null,
      area: null,
    }
  }

  /* We only want to rerender if either hoverIndex or props changes */
  public shouldComponentUpdate(nextProps, nextState) {
   const propsChanged = Object.keys(this.props)
                        .some(o => this.props[o] !== nextProps[o])
   const hoverChanged = this.state.hoverIndex !== nextState.hoverIndex
   const refChanged = this.state.ref !== nextState.ref

   return propsChanged || hoverChanged || refChanged
  }

  // setState based on new props passed
  static getDerivedStateFromProps(newProps, prevState) {
    if (Object.keys(newProps).every(o => newProps[o] === prevState[o])) {
      return null
    }

    const { width, height, data } = newProps

    const getTimeMeasurements = data => {
      if (!data) {
        return null
      }
      return newProps.data.map(d => {
        return ({
          x: moment.utc(d[0]).toDate(),
          y: d[1].map(v => _.isFinite(v) ? v : 0)
        })})
    }

    const values = _.flatMap(newProps.data.map(d => d[1]))

    // Cleanse data into valid format(date and values)
    // Make sure our coordinates are sorted by date asscending
    const measurements = getTimeMeasurements(newProps.data)
                  .sort((a, b) => {
                    return moment(a.x).diff(moment(b.x))
                  })

    // Domain of x coordinates (date)
    const timeExtent = [
      _.head(measurements).x,
      _.last(measurements).x
    ]

    // Domain of y coordinates (value)
    const valueExtent = d3array.extent(values)

    const xScale = d3scale.scaleTime()
                    .domain(timeExtent)
                    .range([0, width])

    const yScale = d3scale.scaleLinear()
     // multily by 5% so we can have some spacing b/w the last point and the top of the graph
                    .domain([valueExtent[0], valueExtent[1] * 1.05])
                    .range([height, 0])

    const line = d3shape.line()
                  .x(d => xScale(d.x))
                  .y(d => yScale(d.y))
                  .curve(d3shape.curveStepBefore)

    const area = d3shape.area()
                  .x((d) => xScale(d.x))
                  .y0(yScale(valueExtent[0]))
                  .y1((d) => yScale(d.y))
                  .curve(d3shape.curveStepBefore)
    return {
      width,
      height,
      xScale,
      yScale,
      line,
      area,
      data,
      measurements,
    }
  }

  public componentDidMount() {
    this.setState({ ref: this.ref })
  }

  public handleMouseMove = (e) => {
    const { measurements, xScale , idx } = this.state

    const hoverIndex =  e.clientX -  this.state.ref.getBoundingClientRect().left
    const bisectDate = d3array.bisector(d => d.x).left
    const newIdx = bisectDate(measurements, xScale.invert(hoverIndex))

    this.setState({ idx: newIdx, hoverIndex })
    const values = measurements[newIdx].y // Remember to figure out empty case
    this.props.onHover(values)

  }

  public handleMouseLeave = (e) => this.setState({ idx: -1 })

  public render () {
    const { height, width, xScale, yScale, line, area, measurements, idx, hoverIndex } = this.state
    const { onHover, toggleInfo, labels } = this.props

    let valueIndexes: number[] = []
    labels.forEach((label, i) => {
      if (toggleInfo[`${label}`]) {
        valueIndexes.push(i)
      }
    })

    const timeseries = valueIndexes.map(i => {
      const lineProps = {
        line,
        area,
        key: i,
        data: measurements.map(m => ({
          x: m.x,
          y: m.y[i],
        }))
      }
      return <HKLine {...lineProps} />
    })

    const indicator = <line  x1={hoverIndex} y1='0' x2={hoverIndex} y2={height} stroke='#79589f' strokeWidth='1' />

    return (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          ref={ref => this.ref = ref}
          className='br0 ba b--gray'>
          {indicator}
          <HKGrid
            {...this.state}
          />
          {timeseries}
        </svg>
    )
  }
}
