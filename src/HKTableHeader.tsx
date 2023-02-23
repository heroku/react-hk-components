import { MalibuIcon } from '@heroku/react-malibu'
import classNames from 'classnames'
import * as React from 'react'

interface ISort {
  id: string
  desc: boolean
}

interface IHeaderPropTypes {
  className: string
  id: string
  label: string
  sort: ISort
}

const HKTableHeader: React.FunctionComponent<any> = ({
  className,
  label,
  id,
  sort,
}: IHeaderPropTypes) => {
  const sortUi = sort
    ? sort.id === id && (
        <MalibuIcon
          name={sort.desc ? 'direction-up-16' : 'direction-down-16'}
          size={16}
          extraClasses={classNames('malibu-fill-gradient-dark-gray')}
        />
      )
    : null
  return (
    <div
      className={classNames(
        'pa2 dark-gray ttc b f5 flex items-center',
        className
      )}
    >
      {sortUi}
      {label}
    </div>
  )
}

HKTableHeader.displayName = 'HKTableHeader'
export default HKTableHeader
