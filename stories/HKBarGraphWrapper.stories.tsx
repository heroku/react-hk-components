import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { default as HKBarGraphWrapper } from '../src/HKBarGraphWrapper'

storiesOf('HKBarGraph', module)
  .add('default', () => (
    <HKBarGraphWrapper data={[5,12,3,8]} height={300} width={300} label='label' />
  ))
