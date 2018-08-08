import * as React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import {
  default as HKButton,
  Type as ButtonType,
} from '../src/HKButton'
import { default as HKModal, Type } from '../src/HKModal'

interface IModalWrapperProps {
  showHeader?: boolean,
  showButtons?: boolean,
  initialShowModal?: boolean,
  isFlyout?: boolean,
  hasConfirm?: boolean,
  type?: Type,
}

interface IModalWrapperState {
  confirmValue?: string,
  showModal: boolean,
  isFlyout?: boolean,
}

class ModalWrapper extends React.Component<
  IModalWrapperProps,
  IModalWrapperState
> {

  public static defaultProps = {
    showButtons: true,
    showHeader: true,
  }

  constructor (props) {
    super(props)
    this.state = {
      confirmValue: '',
      isFlyout: props.isFlyout,
      showModal: props.initialShowModal,
    }
  }

  public render () {
    let confirmInput
    let okDisabled = false
    if (this.props.hasConfirm) {
      confirmInput = (
        <div>
          <p>Type 'confirm' to enable the OK button</p>
          <input
            id='verifyForceRotateCredential'
            className='hk-input w-100'
            autoCorrect='off'
            spellCheck={false}
            autoFocus={true}
            onChange={this.handleConfirmChange}
            value={this.state.confirmValue}
          />
        </div>
      )
      okDisabled = this.state.confirmValue !== 'confirm'
    }
    return (
      <div>
        <HKButton type={ButtonType.Primary} onClick={this.showModal}>Show the Modal</HKButton>
        <HKModal
          isFlyout={this.state.isFlyout}
          type={this.props.type && this.props.type}
          show={this.state.showModal}
          onDismiss={this.handleModalDismiss}
          header={this.props.showHeader && (<div>header text</div>)}
          buttons={this.props.showButtons ? [
            {
              disabled: false,
              text: 'Cancel',
              type: ButtonType.Tertiary,
              value: 'cancel',
            },
            {
              disabled: okDisabled,
              text: 'OK',
              type: this.props.type === Type.Destructive ? ButtonType.Danger : ButtonType.Primary,
              value: 'ok',
            },
          ] : undefined}
        >
          <div className='pa6'>
            <p>with some important details here below</p>
            {confirmInput}
          </div>
        </HKModal>
      </div>
    )
  }

  private handleModalDismiss = (value?: string) => {
    this.setState({ showModal: false, confirmValue: '' })
    action('Modal Dismiss')(value)
  }

  private handleConfirmChange = (e) => {
    this.setState({ confirmValue: e.target.value })
  }

  private showModal = () => {
    this.setState({ showModal: true })
  }
}

[true, false].forEach((open) => {
  storiesOf(`HKModal/${open ? 'initially open' : 'initially closed'}`, module)
  .add('default', () => <ModalWrapper initialShowModal={open}/>)
  .add('default without header', () => <ModalWrapper showHeader={false} initialShowModal={open}/>)
  .add('default without footer', () => <ModalWrapper showButtons={false} initialShowModal={open}/>)
  .add('default without header and footer', () => <ModalWrapper showHeader={false} showButtons={false} initialShowModal={open}/>)
  .add('flyout', () => <ModalWrapper isFlyout={true} initialShowModal={open}/>)
  .add('destructive', () => <ModalWrapper type={Type.Destructive} initialShowModal={open}/>)
  .add('with confirmation', () => <ModalWrapper type={Type.Destructive} hasConfirm={true} initialShowModal={open}/>)
})
