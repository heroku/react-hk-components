import * as React from 'react'
import ReactTable from 'react-table'
import './styles/table.css'

import {
  default as HKTablePagination,
} from '../src/HKTablePagination'

const HKTable = (props) => <ReactTable {...props} PaginationComponent={HKTablePagination} />
export default HKTable
