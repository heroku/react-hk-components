import { MalibuIcon } from '@heroku/react-malibu'
import * as React from 'react'
import SRMModal from 'simple-react-modal'

interface IModalProps {
  children: JSX.Element,
  onDismiss: (...args: any[]) => any,
  show: boolean,
}

export default class Modal extends React.Component<IModalProps, {}> {
  public render () {
    const { show, children, onDismiss } = this.props
    return (
      <SRMModal
        containerStyle={{}}
        containerClassName="w-100 mw7 center bg-white shadow-outer-1 br1"
        style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, "zIndex": 9999, background: 'rgba(0,0,0,.2)' }}
        className="flex flex-column items-center justify-center"
        closeOnOuterClick={true}
        show={show}
        onClose={onDismiss}
      >
      {children}
      </SRMModal>
    )
  }
}
