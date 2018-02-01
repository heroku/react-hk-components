import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Modal, ModalHeader } from '../src'

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
      <Modal show={this.state.showModal} onDismiss={this.handleModalDismiss}>
        <ModalHeader onDismiss={this.handleModalDismiss}>
          <div>
            header text
          </div>
        </ModalHeader>
        <div className='tc pa5'>
          with some important details here below
        </div>
      </Modal>
    </div>)
  }
}

storiesOf('Modal', module)
  .add('default', () => (
    <ModalWrapper />
  ))
