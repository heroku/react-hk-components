import * as React from 'react'

import { default as HKLegendItem } from './HKLegendItem'
import { default as HKLineChartData } from './HKLineChartData'
import { default as HKResizeContainer } from './HKResizeContainer'

import * as _ from 'lodash'

import { getMaxValues } from './helpers'

interface ILineChartProps {
  data: any, // Assumes the data comes in the format [{time, value =[1,2,] },...]
  height: number,
  labels: string[],
}

interface ILineChartState {
  hoverInfo: object,
  toggleInfo: object,
}

export default class HKLineChart extends React.Component<ILineChartProps, ILineChartState> {

  constructor (props) {
    super(props)
    const hoverInfo = {}
    const toggleInfo = {}

    const maxValues = getMaxValues(props.data)

    props.labels.forEach((label, i) => {
      hoverInfo[`${label}-${i}`] = maxValues[i]
      toggleInfo[`${label}-${i}`] = true
    })

    this.state = {
      hoverInfo,
      toggleInfo,
    }
  }

  public render () {
    const { hoverInfo, toggleInfo } = this.state

    const legend = this.props.labels.map((label, i) => (
      <HKLegendItem
        key={i}
        type='line'
        zIndex={i}
        label={label}
        show={toggleInfo[`${label}-${i}`]}
        onToggle={this.handleToggle}
        value={hoverInfo[`${label}-${i}`]}
      />
    ))

    return (
      <div className='flex'>
        <HKResizeContainer>
          {(width) => (<HKLineChartData {...this.props} width={width} onHover={this.handleHover} toggleInfo={toggleInfo}/>)}
        </HKResizeContainer>
        <div className='w6'>
          {legend}
        </div>
      </div>
    )
  }

  private handleHover = (values) => {
    const hoverInfo = {}

    this.props.labels.forEach((label, index) => hoverInfo[`${label}-${index}`] = values[index])
    this.setState({ hoverInfo })
  }

  private handleToggle = (label, i) =>
    this.setState({
      toggleInfo : {
        ...this.state.toggleInfo,
        [`${label}-${i}`] : !this.state.toggleInfo[`${label}-${i}`],
      },
    })
}
