import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { default as HKUpperLineGraph } from '../src/HKUpperLineGraph'

storiesOf('HKUpperLineGraph', module)
  .add('default', () => (
    <HKUpperLineGraph
      data={
        [["2015-04-23 17:18:06.074707+00",
        [92048, 493280, 34934]],
        ["2015-04-21 17:51:39.113926+00",
        [93312, 494500, 234343]],
        ["2015-04-21 16:42:21.010869+00",
        [93860, 478796, 100345]],
        ["2015-04-23 17:19:06.083126+00",
        [95056, 899412, 10000]]]}
      height={100}
      width={100}
      labels={['dragonfruit', 'mango', 'nectarines']}
    />
  ))
