import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Modal } from '../src'

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
        <div className='tc f2 pa2'>
          here is an important notice
        </div>
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
