import { MalibuIcon } from '@heroku/react-malibu'
import classnames from 'classnames'
import * as React from 'react'

interface ISort {
  id: string,
  desc: boolean,
}

interface IHeaderPropTypes {
  id: string,
  label: string,
  sort: ISort,
}

const HKTableHeader: React.FunctionComponent<any> = ({ label, id, sort }: IHeaderPropTypes) => {
  return (
    <div className='pa2 dark-gray tl ttc b f5 flex items-center'>
      {sort.id === id && <MalibuIcon name={sort.desc ? 'direction-up-16' : 'direction-down-16'} size={16} extraClasses={classnames('malibu-fill-gradient-dark-gray')} />}
      {label}
    </div>
  )
}

HKTableHeader.displayName = 'HKTableHeader'
export default HKTableHeader
