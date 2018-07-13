import { MalibuIcon } from '@heroku/react-malibu'
import * as classnames from 'classnames'
import * as React from 'react'
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
  onDismiss: (...args: any[]) => any,
  show: boolean,
  type?: Type,
}

export default class HKModal extends React.Component<IModalProps, {}> {
  public render () {
    const { show, children, onDismiss, header, footer, type } = this.props
    const headerElem = header && (
      <div className={classnames('hk-modal-header pa4 bg-near-white', { red : type === 'destructive' })}>
        {header}
      </div>
    )
    const dismissElem = onDismiss && (
      <div className='right-1 h-100 absolute pointer' onClick={onDismiss}>
        <MalibuIcon name='delete-16' fillClass='dark-gray' extraClasses='icon malibu-icon h1 w1 fill-dark-gray o-50 hover-o-100 h-100 v-mid'/>
      </div>
    )
    return (
      <SRMModal
        containerStyle={{}}
        containerClassName='w-100 mw7 center bg-white shadow-outer-1 br1 relative'
        style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999, background: 'rgba(0,0,0,.2)' }}
        className='flex flex-column items-center justify-center'
        closeOnOuterClick={true}
        show={show}
        onClose={onDismiss}
      >
        <div className='bg-near-white dark-gray bb b--light-silver f4 flex items-center justify-center br--top br2'>
          {headerElem}
          {dismissElem}
        </div>

        {children}

        <div className='bt b--light-silver w-100 pa3 tr'>
          {footer}
        </div>
      </SRMModal>
    )
  }
}
