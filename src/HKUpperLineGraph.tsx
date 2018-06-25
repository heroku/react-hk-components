import * as React from 'react'

import * as _ from 'lodash'
import * as d3scale from 'd3-scale'
import * as d3array from 'd3-array'
import * as d3shape from 'd3-shape'
import * as moment from 'moment'

import { default as HKLineGraph } from './HKLineGraph'
import { default as HKLegendItem } from './HKLegendItem'

interface IUpperLineGraphProps {
  height: number,
  width: number,
  data: any, // Assumes the data comes in the format [{time, value =[1,2,] },...]
  labels: string[],
}

interface IUpperLineGraphState {
  hoverInfo: object,
  toggleInfo: object,
}

export default class HKUpperLineGraph extends React.Component<IUpperLineGraphProps, IUpperLineGraphState> {
  private ref: SVGSVGElement | null

  constructor(props) {
    super(props)
    let hoverInfo = {}, toggleInfo = {}

    props.labels.forEach(label => {
      hoverInfo[label] = 0 // FIX THIS
      toggleInfo[label] = true
    })

    this.state = {
      hoverInfo: { ...hoverInfo },
      toggleInfo: { ... toggleInfo },
    }
  }

  public render () {

    const { hoverInfo, toggleInfo } = this.state

    return (
      <div className='flex flex-row'>
         <HKLineGraph
           {...this.props}
            onHover={this.handleHover}
            toggleInfo={toggleInfo}
          />
          <div className='flex flex-column ma2'>
            {this.props.labels.map((label, i) => (
              <HKLegendItem
                key={i}
                label={label}
                show={toggleInfo[`${label}`]}
                onToggle={this.handleToggle}
                value={hoverInfo[`${label}`]}
              />
            )) }
          </div>
      </div>
    )
  }

  handleHover = (values) => {
    let hoverInfo = {}

    this.props.labels.forEach((label, index) => hoverInfo[`${label}`] = values[index])
    this.setState({ hoverInfo })
  }

  handleToggle = (label) =>
    this.setState({
      toggleInfo : {
        ...this.state.toggleInfo,
        [label] : !this.state.toggleInfo[label],
      }
    })

}
