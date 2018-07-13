import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { default as HKButton } from '../src/HKButton'
import { default as HKModal, Type } from '../src/HKModal'

interface IModalWrapperProps {
  initialShowModal?: boolean,
}

interface IModalWrapperState {
  showModal: boolean,
}

class ModalWrapper extends React.Component<IModalWrapperProps, IModalWrapperState> {

  constructor (props) {
    super(props)
    this.state = {
      showModal: props.initialShowModal,
    }
  }

  public render () {
    return (
      <div>
        <button onClick={this.showModal}>show it</button>
        <HKModal
          type={Type.Destructive}
          show={this.state.showModal}
          onDismiss={this.handleModalDismiss}
          header={<div>header text</div>}
          footer={<HKButton>Submit</HKButton>}
        >
          <div className='pa6'>
            with some important details here below
          </div>
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
  .add('default', () => (
    <ModalWrapper />
  ))
  .add('initially open', () => (
    <ModalWrapper initialShowModal={true} />
  ))
