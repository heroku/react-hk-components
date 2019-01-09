import * as React from 'react'
import ReactTable from 'react-table'
import './static/styles/table.css'

import { default as HKTablePagination } from './HKTablePagination'

const HKTable: React.FunctionComponent<any> = props => {
  const tableRef = React.createRef<HTMLDivElement>()

  const handlePageChange = (...args) => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView()
    }
    if (props.onPageChange) {
      props.onPageChange(...args)
    }
  }

  return (
    <div ref={tableRef}>
      <ReactTable
        {...props}
        onPageChange={handlePageChange}
        PaginationComponent={HKTablePagination}
      />
    </div>
  )
}

HKTable.displayName = 'HKTable'
export default HKTable
