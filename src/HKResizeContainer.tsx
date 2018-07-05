import * as React from 'react'

import { default as Measure } from 'react-measure'

interface IResizeContainerProps {
  children?: any,
}

interface IResizeContainerState {
  width: number,
}

export default class HKResizeContainer extends React.PureComponent<IResizeContainerProps, IResizeContainerState> {
  constructor (props) {
    super(props)

    this.state = {
      width: 100,
    }
  }

  public handleOnResize = (contentRect) => this.setState({ width: contentRect.bounds.width })

  public render () {
    const { children } = this.props
    const { width } = this.state

    return (
      <Measure
        bounds={true}
        onResize={this.handleOnResize}
      >
        {({ measureRef }) => (<div className='flex-auto' ref={measureRef}>{React.cloneElement(children, { width })}</div>)}
      </Measure>
    )
  }
}
