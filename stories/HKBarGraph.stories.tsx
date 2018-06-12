import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { default as HKBarGraph } from '../src/HKBarGraph'

storiesOf('HKBarGraph', module)
  .add('default', () => (
    <HKBarGraph data={[24,32,10,34,56,23,34]} height={300} width={300} />
  ))
