import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from '../src'

const types = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info']
const smallProp = [true, false]
const disabledProps = [true, false]
const asyncProps = [true, false]

types.forEach((type) => {
  const stories = storiesOf(`Button/${type}`, module)
  asyncProps.forEach((isAsync) => {
    // N.B.: async does not work with small or non-disabled
    // buttons so we skip those stories
    smallProp.filter((small) => !isAsync || !small).forEach((small) => {
      disabledProps.filter((disabled) => !isAsync || disabled).forEach((disabled) => {
        const sizeStr = small ? 'small' : 'regular'
        const disabledStr = disabled ? 'disabled' : 'enabled'
        const asyncStr = isAsync ? 'async' : 'normal'
        const storyName = `${sizeStr}-${disabledStr}-${asyncStr}`
        stories.add(storyName, () => (
          <Button
            type={type} small={small} disabled={disabled}
            async={isAsync} onClick={action('clicked')}>
            Click Me
          </Button>
        ))
      })
    })
  })
})

storiesOf('Button', module)
  .add('with custom title', () => (
    <Button title='a custom title' onClick={action('clicked')}>
      Click Me
    </Button>
  ))
  .add('with custom value', () => (
    <Button value='a custom value' onClick={action('clicked')}>
      Click Me
    </Button>
  ))
