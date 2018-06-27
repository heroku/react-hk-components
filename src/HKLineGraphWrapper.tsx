import * as React from 'react'

import { default as HKLegendItem } from './HKLegendItem'
import { default as HKLineGraph } from './HKLineGraph'

import * as _ from 'lodash'

interface ILineGraphWrapperProps {
  data: any, // Assumes the data comes in the format [{time, value =[1,2,] },...]
  height: number,
  labels: string[],
  width: number,
}

interface ILineGraphWrapperState {
  hoverInfo: object,
  toggleInfo: object,
}

export default class HKLineGraphWrapper extends React.Component<ILineGraphWrapperProps, ILineGraphWrapperState> {

  constructor (props) {
    super(props)
    const hoverInfo = {}
    const toggleInfo = {}

    props.labels.forEach((label) => {
      hoverInfo[label] = 0 // FIX THIS
      toggleInfo[label] = true
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
        zIndex={i}
        label={label}
        show={toggleInfo[`${label}`]}
        onToggle={this.handleToggle}
        value={hoverInfo[`${label}`]}
      />
    ))

    return (
      <div className='flex flex-row'>
         <HKLineGraph
           {...this.props}
           onHover={this.handleHover}
           toggleInfo={toggleInfo}
         />
          <div className='flex flex-column'>
            {legend}
          </div>
      </div>
    )
  }

  private handleHover = (values) => {
    const hoverInfo = {}

    this.props.labels.forEach((label, index) => hoverInfo[`${label}`] = values[index])
    this.setState({ hoverInfo })
  }

  private handleToggle = (label) =>
    this.setState({
      toggleInfo : {
        ...this.state.toggleInfo,
        [label] : !this.state.toggleInfo[label],
      },
    })
}
