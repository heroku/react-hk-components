import * as React from 'react'

import { getMaxValues, getNumVisibleCharts } from './helpers'
import { default as HKBarChartData } from './HKBarChartData'
import { default as HKLegendItem } from './HKLegendItem'
import { default as HKResizeContainer } from './HKResizeContainer'

interface IBarChartProps {
  data: any,
  height: number,
  labels: string[],
}

interface IBarChartState {
  hoverInfo: object,
  toggleInfo: object,
}

export default class HKBarChart extends React.Component<IBarChartProps, IBarChartState> {

  constructor (props) {
    super(props)

    const hoverInfo = {}
    const toggleInfo = {}

    const maxValues = getMaxValues(props.data, 'bar')

    props.labels.forEach((label, i) => {
      hoverInfo[i] = maxValues[i]
      toggleInfo[i] = true
    })

    this.state = {
      hoverInfo,
      toggleInfo,
    }
  }

  public render () {
    const { hoverInfo, toggleInfo } = this.state
    const { labels } = this.props

    const legend = labels.map((label, i) => (
      <HKLegendItem
        key={i}
        type='bar'
        zIndex={i}
        label={label}
        show={toggleInfo[i]}
        onToggle={this.handleToggle}
        value={hoverInfo[i]}
        disableToggle={toggleInfo[i] && getNumVisibleCharts(toggleInfo) === 1}
      />
    ))

    return (
      <div className='flex'>
        <HKResizeContainer>
          {(width) => (<HKBarChartData {...this.props} width={width} onHover={this.handleHover} toggleInfo={toggleInfo} />)}
        </HKResizeContainer>
        <div className='w6'>
          {legend}
        </div>
      </div>
    )
  }

  private handleToggle = (label, i) => {
    const maxValues = getMaxValues(this.props.data, 'bar')

    this.setState((prevState) => ({
      hoverInfo : {
        ...prevState.hoverInfo,
        [i] : !prevState.toggleInfo[i] ? maxValues[i] : null,
      },
      toggleInfo: {
        ...prevState.toggleInfo,
        [i] : !prevState.toggleInfo[i],
      },
    }))
  }

  private handleHover = (values, keys) => {
    const hoverInfo = {}
    keys.forEach((key, index) => hoverInfo[key] = values[index])
    this.setState({ hoverInfo })
  }
}
