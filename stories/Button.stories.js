import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from '../src'

storiesOf('Button', module)
  .add('default', () => (
    <Button onClick={action('clicked')}>Default</Button>
  ))
  .add('primary', () => (
    <Button type='primary' onClick={action('clicked')}>Primary</Button>
  ))
