import { MalibuIcon } from '@heroku/react-malibu'
import * as React from 'react'

interface IModalProps {
  children: JSX.Element,
  onDismiss: (...args: any[]) => any,
}

export default class ModalHeader extends React.Component<IModalProps, {}> {
  public render () {
    const { children, onDismiss } = this.props
    let childrenNode = <div></div>
    let dismissNode = <div></div>
    if (children) {
      childrenNode = <div className="hk-modal-header pa4 bg-near-white">{children}</div>
    }
    if (onDismiss) {
      dismissNode = <div className="right-1 h-100 absolute pointer" onClick={onDismiss}>
        <MalibuIcon name='delete-16' fillClass='dark-gray' extraClasses="icon malibu-icon h1 w1 fill-dark-gray o-50 hover-o-100 h-100 v-mid"/>
      </div>
    }

    return (
      <div className="bg-near-white dark-gray bb b--light-silver f4 flex items-center justify-center br--top br2">
        {childrenNode}
        {dismissNode}
      </div>
    )
  }
}
