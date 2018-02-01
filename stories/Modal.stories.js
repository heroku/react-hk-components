import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { HKModal, HKModalHeader, HKModalFooter, Button } from '../src'

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
      <HKModal show={this.state.showModal} onDismiss={this.handleModalDismiss}>
        <HKModalHeader onDismiss={this.handleModalDismiss}>
          <div>
            header text
          </div>
        </HKModalHeader>
        <div className='pa6'>
          with some important details here below
        </div>
        <HKModalFooter>
          <Button>Submit</Button>
        </HKModalFooter>
      </HKModal>
    </div>)
  }
}

storiesOf('Modal', module)
  .add('default', () => (
    <ModalWrapper />
  ))
