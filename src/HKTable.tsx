import * as React from 'react'
import ReactTable from 'react-table'
import './static/styles/table.css'

import { default as HKTablePagination } from './HKTablePagination'

const HKTable: React.FunctionComponent<any> = props => {
  return <ReactTable {...props} PaginationComponent={HKTablePagination} />
}

HKTable.displayName = 'HKTable'
export default HKTable
