import { MalibuIcon } from '@heroku/react-malibu'
import * as classnames from 'classnames'
import * as React from 'react'
import { Transition } from 'react-transition-group'
import SRMModal from 'simple-react-modal'

export enum Type {
  Actionable = 'actionable',
  Destructive = 'destructive',
  Presentation = 'presentation',
}

interface IModalProps {
  children: React.ReactNode,
  header: React.ReactNode,
  footer: React.ReactNode,
  isFlyout?: boolean,
  onDismiss: (...args: any[]) => any,
  show: boolean,
  type?: Type,
}

interface IModalState {
  isClosing: boolean
}

export default class HKModal extends React.Component<IModalProps, IModalState> {
  public static defaultProps: Partial<IModalProps> = {
    isFlyout: false,
  }

  public static getDerivedStateFromProps (props, state) {
    if (!props.show && state.isClosing) {
      return { isClosing: false }
    } else {
      return state
    }
  }

  public state = {
    isClosing: false,
  }

  public handleClose = () => {
    this.setState({
      isClosing: true,
    })
  }

  public handleExited = (node) => {
    node.addEventListener('transitionend', this.props.onDismiss, false)
  }

  public render () {
    const duration = 250
    const { show, children, onDismiss, header, footer, isFlyout, type } = this.props

    const fadeTransition = {
      transition: `background ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    }

    const fadeStyles = {
      entered: { background: 'rgba(0, 0, 0, .2)', opacity: 1 },
      entering: { background: 'rgba(0, 0, 0, 0)', opacity: 0 },
      exited: { background: 'rgba(0, 0, 0, 0)', opacity: 0 },
      exiting: { background: 'rgba(0, 0, 0, .2)', opacity: 1 },
    }

    const innerTransition = isFlyout ? {
      transform: 'translateX(100%)',
      transition: `transform ${duration}ms ease-in-out`,
    } : {}

    const innerStyles = isFlyout ? {
      entered: { transform: 'translateX(0)', width: '350px' },
      entering: { transform: 'translateX(100%)', width: '350px' },
      exited: { transform: 'translateX(100%)', width: '350px' },
      exiting: { transform: 'translateX(0)', width: '350px' },
    } : {}

    const headerElem = header && (
      <div className={classnames('hk-modal-header pa4 bg-near-white', { red : type === 'destructive' })}>
        {header}
      </div>
    )
    const dismissElem = onDismiss && (
      <div className='right-1 h-100 absolute pointer' onClick={this.handleClose}>
        <MalibuIcon
          name='delete-16'
          fillClass='dark-gray'
          extraClasses='icon malibu-icon h1 w1 fill-dark-gray o-50 hover-o-100 h-100 v-mid'
        />
      </div>
    )

    const modalParentClass = {
      'items-center justify-center': !isFlyout,
    }

    const modalClass = {
      'fixed right-0 w7 h-100 flex flex-column': isFlyout,
      'w-100 mw7 center br1': !isFlyout,
    }

    const modalChildrenClass = {
      'flex-auto': isFlyout,
    }

    const transitionIn = this.state.isClosing ? false : show

    return (
      <Transition in={transitionIn} timeout={0} onExited={this.handleExited}>
        {(state) => (
          <SRMModal
            containerStyle={{
              ...innerTransition,
              ...innerStyles[state],
            }}
            containerClassName={classnames('bg-white shadow-outer-1 relative', modalClass)}
            style={{
              bottom: 0,
              left: 0,
              position: 'fixed',
              right: 0,
              top: 0,
              zIndex: 9999,
              ...fadeTransition,
              ...fadeStyles[state],
            }}
            className={classnames('flex flex-column', modalParentClass)}
            closeOnOuterClick={true}
            show={show}
            onClose={this.handleClose}
          >
            <div className='bg-near-white dark-gray bb b--light-silver f4 flex items-center justify-center br--top br2'>
              {headerElem}
              {dismissElem}
            </div>

            <div className={classnames(modalChildrenClass)}>{children}</div>

            {footer && <div className='bt b--light-silver w-100 pa3 tr'>{footer}</div>}
          </SRMModal>
        )}
      </Transition>
    )
  }
}
