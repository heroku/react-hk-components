import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { default as HKTable } from '../src/HKTable'

import { default as HKTableHeader } from '../src/HKTableHeader'

let sort = {
  desc: false,
  id: 'name',
}

const handleSortChange = clickedColumns => {
  const [column] = clickedColumns
  sort = column
}

const data = [
  {
    age: 26,
    name: 'Tanner Linsley',
  },
]

const paginatedData = Array.from(new Array(500), () => ({
  age: 18,
  name: 'Matt Rothenberg',
}))

const columns = [
  {
    Header: () => <HKTableHeader label='Name' id='name' sort={sort} />,
    accessor: 'name',
  },
  {
    Header: () => (
      <HKTableHeader className='justify-end' label='Age' id='age' sort={sort} />
    ),
    accessor: 'age',
    style: {
      justifyContent: 'flex-end',
    },
  },
]

storiesOf('HKTable', module)
  .add(`Without Pagination`, () => (
    <HKTable
      onSortedChange={handleSortChange}
      showPagination={false}
      columns={columns}
      data={data}
    />
  ))
  .add(`With Pagination`, () => (
    <HKTable
      onSortedChange={handleSortChange}
      showPagination={true}
      columns={columns}
      data={paginatedData}
    />
  ))
  .add(`Fixed Height (px) With Pagination`, () => (
    <HKTable
      height={'400px'}
      showPagination={true}
      columns={columns}
      onSortedChange={handleSortChange}
      data={paginatedData}
    />
  ))
  .add(`Fixed Height (px) With Pagination and Custom Style`, () => (
    <HKTable
      style={{
        background: 'red',
        maxHeight: 200,
      }}
      showPagination={true}
      columns={columns}
      onSortedChange={handleSortChange}
      data={paginatedData}
    />
  ))
  .add(`Fixed Height (vh) With Pagination`, () => (
    <HKTable
      height={'100vh'}
      showPagination={true}
      columns={columns}
      onSortedChange={handleSortChange}
      data={paginatedData}
    />
  ))
