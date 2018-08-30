import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withMarkdownNotes } from '@storybook/addon-notes'
import { markdownPropsTable } from './util'

import { default as HKButton, Type } from '../src/HKButton'

const types = [
  Type.Primary, Type.Secondary, Type.Tertiary, Type.Danger, Type.Warning, Type.Info, Type.Success,
]
const smallProp = [true, false]
const disabledProps = [true, false]
const asyncProps = [true, false]
const withPropsTable = withMarkdownNotes(markdownPropsTable(HKButton))

types.forEach((type) => {
  const stories = storiesOf(`HKButton/${type}`, module)
  asyncProps.forEach((isAsync) => {
    // N.B.: async does not work with small or non-disabled
    // buttons so we skip those stories
    smallProp.filter((small) => !isAsync || !small).forEach((small) => {
      disabledProps.filter((disabled) => !isAsync || disabled).forEach((disabled) => {
        const sizeStr = small ? 'small' : 'regular'
        const disabledStr = disabled ? 'disabled' : 'enabled'
        const asyncStr = isAsync ? 'async' : 'normal'
        const storyName = `${sizeStr}-${disabledStr}-${asyncStr}`
        stories.add(storyName, withInfo({ inline: true, header: false })(() => (
          <HKButton type={type} small={small} disabled={disabled} async={isAsync} onClick={action('clicked')}>
            Click Me
          </HKButton>
        )))
      })
    })
  })
})

storiesOf('HKButton', module)
  .add('with custom title', withPropsTable(() => (
    <HKButton title='a custom title' onClick={action('clicked')}>
      Click Me
    </HKButton>
  )))
  .add('with custom value', () => (
    <HKButton value='a custom value' onClick={action('clicked')}>
      Click Me
    </HKButton>
  ))
