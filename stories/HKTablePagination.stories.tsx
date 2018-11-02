import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  default as HKTablePagination,
} from '../src/HKTablePagination'

const handlePageChange = action(`Page Change`)

storiesOf('HKTablePagination', module)
  .add(`beginning`, () => {
    const page = 0
    return <HKTablePagination page={page} pages={20} onPageChange={handlePageChange}/>
  })
  .add(`middle`, () => {
    const page = 10
    return <HKTablePagination page={page} pages={20} onPageChange={handlePageChange}/>
  })
  .add(`end`, () => {
    const page = 19
    return <HKTablePagination page={page} pages={20} onPageChange={handlePageChange}/>
  })
