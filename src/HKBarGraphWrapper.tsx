import * as React from 'react'

import { default as HKBarGraph } from './HKBarGraph'
import { default as HKLegendItem } from './HKLegendItem'

import * as d3array from 'd3-array'
import * as _ from 'lodash'

interface IBarGraphWrapperProps {
  data: number[],
  height: number,
  width: number,
  label?: string,
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

    return (
      <div className='flex flex-row'>
         <HKBarGraph
           {...this.props}
           onHover={this.handleHover}
         />
          <div className='flex flex-column'>
            <HKLegendItem
              zIndex={1}
              label={this.props.label || 'label'}
              show={true}
              value={this.state.hoverValue}
            />
          </div>
      </div>
    )
  }

  private handleHover = (value) => this.setState({ hoverValue: value })
}
