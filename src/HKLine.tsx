import * as React from 'react'

interface ILineProps {
  data: any, // [[time, value]]
  line: any,
  area: any,
}

export default class HKLine extends React.PureComponent<ILineProps, {}> {

  public render () {
    const { line, area, data } = this.props

    return (<g>
          <path d={line(data)} fill='none' stroke='#79589f' strokeWidth='1'/>
          <path d={area(data)} fill='#79589f' fillOpacity='0.2'/>
        </g> )
  }
}
