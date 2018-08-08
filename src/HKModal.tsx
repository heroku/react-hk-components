import { MalibuIcon } from '@heroku/react-malibu'
import * as classnames from 'classnames'
import * as React from 'react'
import { Transition } from 'react-transition-group'
import SRMModal from 'simple-react-modal'
import {
  default as HKButton,
  Type as ButtonType,
} from './HKButton'

export enum Type {
  Actionable = 'actionable',
  Destructive = 'destructive',
  Presentation = 'presentation',
}

interface IButtonDefinition {
  classNames?: string,
  disabled: boolean,
  text: string,
  type: ButtonType,
  value: string,
}

interface IModalProps {
  children: React.ReactNode,
  header?: React.ReactNode,
  buttons?: IButtonDefinition[],
  isFlyout?: boolean,
  onDismiss: (value?: string) => any,
  show: boolean,
  type?: Type,
}

interface IModalState {
  isShowing: boolean,
  isClosing: boolean,
}

/*
Dramatis personae of the event flow in this component
* Show: props.show. Used by the controlling component to indicate a desire to show/hide.
* iS: state.isShowing. Initially false.
* iC: state.isClosing. Initially false.
* in: What should be passed as a prop to <Transition in={ aBoolean } ... />

   Show  iS  iC  in
1. F     F   F   -   never displayed
2. T     F   F   -   controlling component wants us to display! gDSFP will derive the state on the following line.
3. T     T   F   T   Shows the modal. In becomes true so transition in happens.
4. *** props.onDismiss() is called, resulting in the controlling component setting show to F ***
5. F     T   F   T   controlling component wants us to hide! gDSFP will derive the following state
6. F     T   T   F   Transition to closed. In becomes false, triggers transition state "exiting"
7. *** Transition out continues until handleExited() fires, setting isShowing to false
8. F     F   T   F   Modal is hidden. Transition state is 'exited'
9. T     F   T   F   Controlling component wants us to display! gDSFP will take us to step 3.
*/
export default class HKModal extends React.Component<IModalProps, IModalState> {
  public static defaultProps: Partial<IModalProps> = {
    isFlyout: false,
  }

  public static getDerivedStateFromProps (props, state) {
    if (props.show) {
      // reset state, we're showing the thing and not closing at all
      return { isShowing: true, isClosing: false }
    } else {
      // We're somewhere in the process of closing the modal
      // So set isClosing to true.
      // isShowing will be set to false by handleExited(),
      // which is the handler fired at the end of the transition out.
      return { isClosing: true }
    }
  }

  public state = {
    isClosing: false,
    isShowing: false,
  }

  public handleClose = (e: React.MouseEvent<HTMLElement>) => {
    this.props.onDismiss('cancel')
  }

  public handleButtonClick = (e: React.MouseEvent<HTMLInputElement>) => {
    this.props.onDismiss(e.currentTarget.value)
  }

  public handleExited = (node: Element) => {
    node.addEventListener('transitionend', () => {
      this.setState({ isShowing: false })
    }, false)
  }

  public render () {
    const duration = 250
    const { children, onDismiss, header, buttons, isFlyout, type } = this.props
    const { isShowing, isClosing } = this.state

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
      transition: `transform ${duration}ms cubic-bezier(0,1,0.5,1)`,
    } : {}

    const innerStyles = isFlyout ? {
      entered: { transform: 'translateX(0)', width: '350px' },
      entering: { transform: 'translateX(100%)', width: '350px' },
      exited: { transform: 'translateX(100%)', width: '350px' },
      exiting: { transform: 'translateX(0)', width: '350px' },
    } : {}

    const dismissElem = onDismiss && (
      <div className={classnames('right-1 absolute pointer', { 'top-1': !header })} onClick={this.handleClose}>
        <MalibuIcon
          name='delete-16'
          fillClass='dark-gray'
          size={16}
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

    const footer = (buttons || []).map((b) => (
      <HKButton key={b.value} value={b.value} type={b.type} disabled={b.disabled} onClick={this.handleButtonClick} className={classnames('ml1', b.classNames)}>{b.text}</HKButton>
    ))

    // in={!isClosing} is derived from the state table at the top of this component
    return (
      <Transition in={!isClosing} timeout={0} onExited={this.handleExited}>
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
            show={isShowing}
            onClose={this.handleClose}
          >
            <div className={classnames(
              'hk-modal-header f4 flex items-center justify-center br--top br2',
              { 'bg-near-white bb b--light-silver pa4': header, 'red': type === 'destructive' }
            )}> {header}
              {dismissElem}
            </div>

            <div className={classnames(modalChildrenClass)}>{children}</div>

            {buttons && <div className='bt b--light-silver w-100 pa3 tr'>{footer}</div>}
          </SRMModal>
        )}
      </Transition>
    )
  }
}
