import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { default as HKTextField } from '../src/HKTextField'

storiesOf('HKTextField', module)
  .add('blank', () => {
    return <HKTextField onChange={action('onChange event')} value='' placeholder='Enter some text' type='text' />
  })
  .add('default, type TEXT', () => {
    return <HKTextField onChange={action('onChange event')} value='Hello world' placeholder='Enter some text' type='text' />
  })
  .add('default, type PASSWORD', () => {
    return <HKTextField onChange={action('onChange event')} value='1234' placeholder='Enter some text' type='password' />
  })
  .add('default, custom class', () => {
    return <HKTextField className='f1 w-100 red' onChange={action('onChange event')} value='Hello world' placeholder='Enter some text' type='text' />
  })
  .add('disabled', () => {
    return <HKTextField disabled={true} value='1234' placeholder='Enter some text' type='text' />
  })
  .add('autoSelect true', () => {
    return <HKTextField autoSelect={true} onChange={action('onChange event')} value='Hello world' placeholder='Enter some text' type='text' />
  })
  .add('readOnly true', () => {
    return <HKTextField readOnly={true} value='Hello world' placeholder='Enter some text' type='text' />
  })
  .add('readOnly + autoSelect', () => {
    return <HKTextField readOnly={true} autoSelect={true} value='Hello world' placeholder='Enter some text' type='text' />
  })
