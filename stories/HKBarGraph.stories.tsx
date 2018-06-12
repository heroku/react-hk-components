import * as React from 'react'

import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'
import * as d3Shape from 'd3-shape'

import { storiesOf } from '@storybook/react'

import { default as HKBarGraph } from '../src/HKBarGraph'

storiesOf('HKBarGraph', module)
  .add('default', () => (
    <HKBarGraph data={[10,34,56,23,34]} height={300} width={300} />
  ))
