import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  default as HKFlagIcon,
  Regions,
} from '../src/HKFlagIcon'

const stories = storiesOf('HKFlagIcon', module)
Object.keys(Regions)
  .forEach((region) => {
    stories.add(Regions[region], () => (<HKFlagIcon basePath='/flags/' region={Regions[region]} />))
  })
