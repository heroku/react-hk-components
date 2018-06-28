import * as React from 'react'

import { default as HKLegendItem } from './HKLegendItem'
import { default as HKLineGraph } from './HKLineGraph'

import * as _ from 'lodash'
import { default as ContainerDimensions } from 'react-container-dimensions'
import { getMaxValues } from './helpers'

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
            {({ width }) => { try  { return (<HKLineGraph {...this.props} width={width} onHover={this.handleHover} toggleInfo={toggleInfo}/>) } catch (e) { return e.message }}}
          </ContainerDimensions>
        </div>
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
