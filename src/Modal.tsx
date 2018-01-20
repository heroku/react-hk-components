import { MalibuIcon } from '@heroku/react-malibu'
import * as React from 'react'
import * as SRMModal from 'simple-react-modal'

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
        style={{ fontFamily: undefined }}
        containerStyle={{ borderRadius: '5px', borderWidth: '1px', borderColor: 'black', width: 500 }}
        closeOnOuterClick={true}
        show={show}
        onClose={onDismiss}
      >
      <div
        style={{ position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}
        onClick={onDismiss}
      >
        <MalibuIcon name='edit-reject-16' size={12} fillClass='dark-gray' />
      </div>
      {children}
      </SRMModal>
    )
  }
}
