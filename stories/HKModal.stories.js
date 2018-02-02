import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { HKModal, HKButton } from '../src'

class ModalWrapper extends React.Component {
  state = {
    showModal: false
  }

  handleModalDismiss = () => {
    this.setState({ showModal: false })
  }

  showModal = () => {
    this.setState({ showModal: true })
  }

  render () {
    return (<div>
      <button onClick={this.showModal}>show it</button>
      <HKModal
        show={this.state.showModal}
        onDismiss={this.handleModalDismiss}
        header={
          <div>header text</div>
        }
        footer={
          <HKButton>Submit</HKButton>
        }>
        <div className='pa6'>
          with some important details here below
        </div>
      </HKModal>
    </div>)
  }
}

storiesOf('Modal', module)
  .add('default', () => (
    <ModalWrapper />
  ))
