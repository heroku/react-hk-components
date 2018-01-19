import * as React from 'react'
import * as PropTypes from 'prop-types'

import { MalibuIcon } from '@heroku/react-malibu'

import { default as SRMModal } from 'simple-react-modal'

export default class Modal extends React.Component<any, any> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onDismiss: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  }

  render () {
    const { show, children, onDismiss } = this.props
    return (<SRMModal
              style={{fontFamily: undefined}}
              containerStyle={{'borderRadius': '5px', 'borderWidth': '1px', 'borderColor': 'black', 'width': 500}}
              closeOnOuterClick={true}
              show={show}
              onClose={onDismiss}>
      <div
        style={{ 'position': 'absolute', 'right': '20px', 'top': '20px', 'cursor': 'pointer' }}
        onClick={onDismiss}>
        <MalibuIcon name='edit-reject-16' size={12} fillClass='dark-gray' />
      </div>
      {children}
    </SRMModal>)
  }
}
