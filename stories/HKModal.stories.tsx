import * as React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import {
  Type as ButtonType,
} from '../src/HKButton'
import { default as HKModal, Type } from '../src/HKModal'

interface IModalWrapperProps {
  initialShowModal?: boolean,
  isFlyout?: boolean
  type?: Type,
}

interface IModalWrapperState {
  showModal: boolean,
  isFlyout?: boolean
}

class ModalWrapper extends React.Component<
  IModalWrapperProps,
  IModalWrapperState
> {
  constructor (props) {
    super(props)
    this.state = {
      isFlyout: props.isFlyout,
      showModal: props.initialShowModal,
    }
  }

  public render () {
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
              disabled: false,
              text: 'OK',
              type: this.props.type === Type.Destructive ? ButtonType.Danger : ButtonType.Primary,
              value: 'ok',
            },
          ]}
        >
          <div className='pa6'>with some important details here below</div>
        </HKModal>
      </div>
    )
  }

  private handleModalDismiss = (value?: string) => {
    this.setState({ showModal: false })
    action('Modal Dismiss')(value)
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
