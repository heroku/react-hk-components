import * as React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import {
  Type as ButtonType,
} from '../src/HKButton'
import { default as HKModal, Type } from '../src/HKModal'

interface IModalWrapperProps {
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
        <button onClick={this.showModal}>show it</button>
        <HKModal
          isFlyout={this.state.isFlyout}
          type={this.props.type && this.props.type}
          show={this.state.showModal}
          onDismiss={this.handleModalDismiss}
          header={<div>header text</div>}
          buttons={[
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
          ]}
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

storiesOf('HKModal', module)
  .add('default', () => <ModalWrapper />)
  .add('default initially open', () => <ModalWrapper initialShowModal={true} />)
  .add('flyout', () => (
    <ModalWrapper isFlyout={true} initialShowModal={false} />
  ))
  .add('flyout initially open', () => (
    <ModalWrapper isFlyout={true} initialShowModal={true} />
   ))
  .add('destructive', () => (
    <ModalWrapper type={Type.Destructive} />
  ))
  .add('destructive with confirmation', () => (
    <ModalWrapper type={Type.Destructive} hasConfirm={true}/>
  ))
