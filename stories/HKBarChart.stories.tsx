import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { default as HKBarChart } from '../src/HKBarChart'

const data = [
[197496, 1243496],
[208380, 1245496],
[218472, 1243700],
[227100, 1243700],
[227168, 1243700],
[227804, 943700],
[228052, 1243700],
[235560, 1243700],
[242152, 1113700]]

storiesOf('HKBarChart', module)
  .add('default', () => (
    <HKBarChart data={data} height={300} width={300} labels={['apples', 'oranges']} />
  ))
