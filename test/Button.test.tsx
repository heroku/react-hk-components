import * as React from 'react'
import { shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import { Button } from '../src'

describe('Button', () => {
  it('should match the snapshot', () => {
    const element = create(<Button>Foobar</Button>).toJSON();
    expect(element).toMatchSnapshot()
  })

  it('should render badge with className', () => {
    const wrapper = shallow(<Button>Foobar</Button>)
    expect(wrapper.prop('className')).toEqual('hk-button--secondary')
  })
})
