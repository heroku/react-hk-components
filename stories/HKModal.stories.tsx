import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { default as HKModal } from '../src/HKModal'
import { default as HKButton } from '../src/HKButton'

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
      showModal: props.initialShowModal
    }
  }

  handleModalDismiss = () => {
    this.setState({ showModal: false })
  }

  showModal = () => {
    this.setState({ showModal: true })
  }

  public render () {
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

storiesOf('HKModal', module)
  .add('default', () => (
    <ModalWrapper />
  ))
  .add('initially open', () => (
    <ModalWrapper initialShowModal={true} />
  ))
