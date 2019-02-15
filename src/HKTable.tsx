import * as React from 'react'
import ReactTable from 'react-table'
import './static/styles/table.css'

import { default as HKTablePagination } from './HKTablePagination'

const HKTable: React.FunctionComponent<any> = props => {
  const tableRef = React.createRef<HTMLDivElement>()

  const handlePageChange = (...args) => {
    if (tableRef.current) {
      const isFixedHeight = !!props.height
      if (isFixedHeight) {
        const scrollableTbody = tableRef.current.querySelector(
          '.rt-tbody'
        ) as HTMLDivElement
        if (scrollableTbody) {
          scrollableTbody.scrollTo(0, 0)
        }
      } else {
        tableRef.current.scrollIntoView()
      }
    }

    if (props.onPageChange) {
      props.onPageChange(...args)
    }
  }

  const heightStyle = props.height
    ? {
        height: `${props.height}`,
      }
    : null

  return (
    <div ref={tableRef}>
      <ReactTable
        {...props}
        style={heightStyle}
        onPageChange={handlePageChange}
        PaginationComponent={HKTablePagination}
      />
    </div>
  )
}

HKTable.displayName = 'HKTable'
export default HKTable
