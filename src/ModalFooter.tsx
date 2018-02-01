import { MalibuIcon } from '@heroku/react-malibu'
import * as React from 'react'

interface IModalProps {
  children: JSX.Element
}

export default class ModalHeader extends React.Component<IModalProps, {}> {
  public render () {
    const { children } = this.props
    return (
      <div className="bt b--light-silver w-100 pa3 tr">
        {children}
      </div>
    )
  }
}
