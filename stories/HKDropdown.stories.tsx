import { MalibuIcon } from '@heroku/react-malibu'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  default as HKButton,
  Type,
} from '../src/HKButton'
import {
  Align,
  default as HKDropdown,
} from '../src/HKDropdown'

const dropdownProps = [
  {
    props: {
      title: 'Dropdown',
    },
    storyName: 'default',
  },
  {
    props: {
      disabled: true,
      title: 'Dropdown',
    },
    storyName: 'disabled',
  },
  {
    props: {},
    storyName: 'no title',
  },
  {
    props: {
      align: Align.Right,
      title: 'Dropdown',
    },
    storyName: 'align right',
  },
  {
    props: {
      align: Align.Left,
      title: 'Dropdown',
    },
    storyName: 'align left',
  },
  {
    props: {
      align: Align.Left,
      closeOnClick: false,
      title: 'Dropdown',
    },
    storyName: 'no close dropdown onclick',
  },
]

const stories = storiesOf(`HKDropdown`, module)
dropdownProps.forEach((dropdown) => {
  stories.add(dropdown.storyName, () => (
    <div className='flex justify-center'>
      <HKDropdown {...dropdown.props}>
        <li className='hk-dropdown-item' onClick={action('Dropdown-item called')}>
          Callback executed onClick
        </li>
        <li><a className='hk-dropdown-item' href='https://www.google.com'>External link </a></li>
        <li className='hk-dropdown-divider'/>
        <li className='hk-dropdown-item--danger' onClick={action('Dropdown-item called')}>Dangerous action </li>
      </HKDropdown>
    </div>
  ))
})