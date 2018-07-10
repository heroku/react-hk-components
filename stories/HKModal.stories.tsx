import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { default as HKButton } from '../src/HKButton'
import { default as HKModal } from '../src/HKModal'

interface IModalWrapperProps {
  initialShowModal?: boolean,
  isFlyout?: boolean
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
          show={this.state.showModal}
          onDismiss={this.handleModalDismiss}
          header={<div>header text</div>}
          footer={<HKButton>Submit</HKButton>}
        >
          <div className='pa6'>with some important details here below</div>
        </HKModal>
      </div>
    )
  }

  private handleModalDismiss = () => {
    this.setState({ showModal: false })
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
