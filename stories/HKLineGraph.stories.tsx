import * as React from 'react'

import { storiesOf } from '@storybook/react'

import { default as HKLineGraph } from '../src/HKLineGraph'

storiesOf('HKLineGraph', module)
  .add('default', () => (
    <HKLineGraph
      data={[["2015-03-04 20:09:06.016252+00", 23],
      ["2015-02-12 22:31:21.604421+00", 10],
      ["2015-02-24 23:19:01.403114+00", 14],
      ["2015-01-24 23:19:01.403114+00", 17]]}
      height={250}
      width={250}
    />
  ))
