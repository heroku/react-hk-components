import * as React from 'react'
import { shallow } from 'enzyme'

import { Button } from '../src'

describe('Button', () => {
  it('should render badge with className', () => {
    const wrapper = shallow(<Button>Foobar</Button>)
    expect(wrapper.prop('className')).toEqual('hk-button--secondary')
  })
})
