import * as React from 'react'
import ReactTable from 'react-table'
import './static/styles/table.css'

import {
  default as HKTablePagination,
} from './HKTablePagination'

const HKTable = (props) => <ReactTable {...props} PaginationComponent={HKTablePagination} />
export default HKTable
