import { MalibuIcon } from '@heroku/react-malibu'
import range from 'lodash/range'
import * as React from 'react'
import {
  default as HKButton,
  Type,
} from './HKButton'

interface IPaginationProps {
  onPageChange: (...args: any[]) => any,
  page: number,
  pages: number,
}

const buildPager = (totalItems, currentPage, pageSize) => {
  const totalPages = Math.ceil(totalItems / pageSize)
  let startPage
  let endPage
  if (totalPages <= 10) {
    startPage = 1
    endPage = totalPages
  } else {
    if (currentPage <= 6) {
      startPage = 1
      endPage = 10
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9
      endPage = totalPages
    } else {
      startPage = currentPage - 5
      endPage = currentPage + 4
    }
  }
  return range(startPage, endPage + 1)
}

const HKTablePagination = (props: IPaginationProps) => {
  const { page, pages, onPageChange } = props

  const currentPage = page + 1
  const prevDisabled = page === 0
  const nextDisabled = currentPage === pages
  const visiblePages = buildPager(pages, currentPage, 1)

  const jumpTo = (pageNum) => {
    const index = pageNum - 1
    onPageChange(index)
  }

  const handlePageClick = (pageNum) => () => jumpTo(pageNum)

  const onPrevious = () => {
    onPageChange(page - 1)
  }
  const onNext = () => {
    onPageChange(page + 1)
  }

  return (
    <div className='pv4 ph3 mw8 center'>
      <div className='flex items-center justify-between'>
        <HKButton type={Type.Tertiary} onClick={onPrevious} disabled={prevDisabled}>
          {!prevDisabled && <MalibuIcon name='direction-left-28' size={16} fillClass='purple' extraClasses='mr1'/>}
          Previous
        </HKButton>
        <div className='purple'>
          {
            visiblePages.map((p) => {
              const isActive = p === currentPage
              return <HKButton className={isActive ? 'bg-lightest-purple' : ''} key={p} type={Type.Tertiary} onClick={handlePageClick(p)}>{p}</HKButton>
            })
          }
        </div>
        <HKButton type={Type.Tertiary} onClick={onNext} disabled={nextDisabled}>
          Next
          {!nextDisabled && <MalibuIcon name='direction-right-28' size={16} fillClass='purple' extraClasses='ml1'/>}
        </HKButton>
      </div>
    </div>
  )
}

export default HKTablePagination
