import * as React from 'react'

import { default as HKBarGraph } from './HKBarGraph'
import { default as HKLegendItem } from './HKLegendItem'

import * as d3array from 'd3-array'
import * as _ from 'lodash'
import { default as ContainerDimensions } from 'react-container-dimensions'

interface IBarGraphWrapperProps {
  data: number[],
  height: number,
  width: number,
  labels: string[],
}

interface IBarGraphWrapperState {
  hoverValue: number,
}

export default class HKBarGraphWrapper extends React.Component<IBarGraphWrapperProps, IBarGraphWrapperState> {

  constructor (props) {
    super(props)

    this.state = {
      hoverValue: d3array.max(props.data),
    }
  }

  public render () {
    const legend = this.props.labels.map((label, i) => (
      <HKLegendItem
        key={i}
        zIndex={0}
        label={label}
        show={true}
        value={this.state.hoverValue}
      />
    ))

    return (
      <div className='flex'>
        <div className='flex-auto'>
          <ContainerDimensions>
            {({ width }) => { try  { return (<HKBarGraph {...this.props} width={width} onHover={this.handleHover} />) } catch (e) { return e.message }}}
          </ContainerDimensions>
        </div>
        <div className='w6'>
          {legend}
        </div>
      </div>
    )
  }

  private handleHover = (value) => this.setState({ hoverValue: value })
}
