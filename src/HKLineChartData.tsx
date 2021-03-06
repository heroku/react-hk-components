import * as React from 'react'

import * as d3array from 'd3-array'
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'

import { flatMap, head, isFinite, last } from 'lodash-es'

import { differenceInMilliseconds, format, parse } from 'date-fns'

import { ChartPadding } from './constants'
import { getMaxValues } from './helpers'

import { default as HKGrid } from './HKGrid'
import { default as HKLine } from './HKLine'
import { default as HKTooltip } from './HKTooltip'

interface ILineChartCoordinate {
  x: Date
  y: number
}

interface ILineChartDataProps {
  data: any // Assumes the data comes in the format [{time, value},...]
  height: number
  labels: string[]
  onHover: (value: number) => void
  toggleInfo: object
  width: number
}

interface ILineChartDataState {
  data: any // Points for graph
  measurements: any // Cleansed data
  height: number
  width: number

  hoverIndex: number
  idx: number

  area: any
  line: any
  xScale: any
  yScale: any
}

export default class HKLineChartData extends React.PureComponent<
  ILineChartDataProps,
  ILineChartDataState
> {
  public static displayName = 'HKLineChartData'

  // setState based on new props passed
  public static getDerivedStateFromProps(newProps, prevState) {
    if (['data', 'width', 'height'].every(o => newProps[o] === prevState[o])) {
      return null
    }

    const { width, height, data } = newProps
    const chartHeight = height - ChartPadding.Vertical
    const chartWidth = width - ChartPadding.Horizontal

    // Cleanse data into valid format(date and values)
    // Make sure our coordinates are sorted by date asscending
    const measurements = formatData(data).sort((a, b) =>
      differenceInMilliseconds(parse(a.x), parse(b.x))
    )

    // Domain of x coordinates (date)
    const timeExtent = [
      (head(measurements) as ILineChartCoordinate).x,
      (last(measurements) as ILineChartCoordinate).x,
    ]

    // Domain of y coordinates (value)
    const values = flatMap(data, d => d[1])
    const [minVal, maxVal] = d3array.extent(values)

    const xScale = d3scale
      .scaleTime()
      .domain(timeExtent)
      .range([0, chartWidth])

    const yScale = d3scale
      .scaleLinear()
      .domain([Math.min(minVal, 0), maxVal])
      .range([chartHeight, 0])

    const line = d3shape
      .line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3shape.curveStepBefore)

    const area = d3shape
      .area()
      .x(d => xScale(d.x))
      .y0(yScale(Math.min(minVal, 0)))
      .y1(d => yScale(d.y))
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

  private ref: SVGSVGElement | null

  constructor(props) {
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

  public handleMouseMove = e => {
    const { measurements, xScale } = this.state

    if (!this.ref) {
      return null
    }

    // TODO: Optimize rendering performance here
    const hoverIndex =
      e.clientX -
      this.ref.getBoundingClientRect().left -
      ChartPadding.Horizontal
    const bisectX = d3array.bisector(d => d.x).left
    const newIdx = bisectX(measurements, xScale.invert(hoverIndex))
    this.setState({ idx: newIdx, hoverIndex })

    if (measurements[newIdx]) {
      const values = measurements[newIdx].y // Remember to figure out empty case
      this.props.onHover(values)
    }
  }

  public handleMouseLeave = e => {
    const { onHover, data } = this.props

    this.setState({ hoverIndex: -1, idx: -1 })
    onHover(getMaxValues(data) as any)
  }

  public render() {
    const {
      height,
      width,
      xScale,
      yScale,
      line,
      area,
      measurements,
      idx,
      hoverIndex,
    } = this.state
    const { toggleInfo, labels } = this.props
    const isHovering = hoverIndex > 0 // we only want to hover if onMouseMove is on the chart (exclude axis)
    const hoverPos = hoverIndex + ChartPadding.Horizontal // hover positioning taking into account padding from axis

    const valueIndexes: number[] = []
    labels.forEach((label, i) => {
      if (toggleInfo[`${label}-${i}`]) {
        valueIndexes.push(i)
      }
    })

    const timeseries = valueIndexes.map(i => {
      const lineProps = {
        area,
        data: measurements.map(m => ({
          x: m.x,
          y: m.y[i],
        })),
        line,
      }
      return <HKLine key={i} {...lineProps} />
    })

    const indicatorPoints = valueIndexes.map(v =>
      // check if y-values exist and check if specific line is toggled on
      measurements[idx] &&
      Object.keys(toggleInfo).map(key => toggleInfo[key])[v] ? (
        <circle
          key={v}
          className='indicatorPoints'
          cx={hoverIndex + ChartPadding.Horizontal}
          cy={yScale(measurements[idx].y[v]) + ChartPadding.Vertical}
          r={2}
        />
      ) : null
    )

    const timeStamp = format(
      xScale.invert(hoverIndex),
      'ddd, MMM D, YYYY h:mm A'
    )
    const indicator = isHovering && (
      <g>
        <line
          x1={hoverPos}
          y1='0'
          x2={hoverPos}
          y2={height}
          stroke='#79589f'
          strokeWidth='1'
        />
        {indicatorPoints}
      </g>
    )

    return (
      <div>
        {isHovering && (
          <HKTooltip xPos={hoverPos} yPos={height / 3}>
            {timeStamp}
          </HKTooltip>
        )}
        <svg
          preserveAspectRatio='none'
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          ref={ref => (this.ref = ref)}
        >
          {indicator}
          <g transform={`translate(${ChartPadding.Horizontal}, 0)`}>
            <HKGrid
              type='line'
              height={height}
              width={width}
              xScale={xScale}
              yScale={yScale}
            />
            <rect
              x='0'
              y='0'
              width={width - ChartPadding.Horizontal}
              height={height}
              className='br0 ba b--silver z-1'
              fill='none'
              stroke='silver'
            />
            <g transform={`translate(0, ${ChartPadding.Vertical})`}>
              {timeseries}
            </g>
          </g>
        </svg>
      </div>
    )
  }
}

function formatData(dataSet) {
  if (!dataSet) {
    return null
  }
  return dataSet.map(d => ({
    x: parse(d[0]),
    y: d[1].map(v => (isFinite(v) ? v : 0)),
  }))
}
