import * as React from 'react'
import { shallow } from 'enzyme'

import { HKButton } from '../src'

describe('HKButton', () => {
  it('should render badge with className', () => {
    const wrapper = shallow(<HKButton>Foobar</HKButton>)
    expect(wrapper.prop('className')).toEqual('hk-button--secondary')
  })
})
