import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  default as HKTable,
} from '../src/HKTable'

import {
  default as HKTableHeader,
} from '../src/HKTableHeader'

const data = [{
  age: 26,
  name: 'Tanner Linsley',
}]

const sort = {
  desc: false,
  id: 'name',
}

const columns = [{
  Header: () => <HKTableHeader label='Name' id='name' sort={sort} />,
  accessor: 'name',
}]

storiesOf('HKTable', module)
  .add(`Without Pagination`, () => (
    <HKTable showPagination={false} columns={columns} data={data} />
  ))
  .add(`With Pagination`, () => (
    <HKTable showPagination={true} columns={columns} data={data} />
  ))