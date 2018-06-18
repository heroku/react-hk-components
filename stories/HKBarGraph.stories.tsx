import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { default as HKBarGraph } from '../src/HKBarGraph'

storiesOf('HKBarGraph', module)
  .add('default', () => (
    <HKBarGraph data={[5,12,3,8]} height={300} width={300} />
  ))
