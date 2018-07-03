import * as React from 'react'

import { getMaxValues } from './helpers'
import { default as HKBarChartData } from './HKBarChartData'
import { default as HKLegendItem } from './HKLegendItem'

import * as _ from 'lodash'
import { default as ContainerDimensions } from 'react-container-dimensions'

interface IBarChartProps {
  data: any,
  height: number,
  width: number,
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
    const { labels } = this.props

    const legend = labels.map((label, i) => (
      <HKLegendItem
        key={i}
        type='bar'
        zIndex={i}
        label={label}
        show={toggleInfo[`${label}-${i}`]}
        onToggle={this.handleToggle}
        value={hoverInfo[`${label}-${i}`]}
      />
    ))

    return (
      <div className='flex'>
        <div className='flex-auto'>
          <ContainerDimensions>
            {({ width }) => (<HKBarChartData {...this.props} width={width} onHover={this.handleHover} toggleInfo={toggleInfo} />)}
          </ContainerDimensions>
        </div>
        <div className='w6'>
          {legend}
        </div>
      </div>
    )
  }

  private handleToggle = (label, i) =>
    this.setState({
      toggleInfo : {
        ...this.state.toggleInfo,
        [`${label}-${i}`] : !this.state.toggleInfo[`${label}-${i}`],
      },
    })

  private handleHover = (values) => {
    const hoverInfo = {}
    this.props.labels.forEach((label, index) => hoverInfo[`${label}-${index}`] = values[index])
    this.setState({ hoverInfo })
  }
}
