import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  BannerType,
  default as HKBanner,
} from '../src/HKBanner'

const types = [
  BannerType.danger,
  BannerType.generic,
  BannerType.info,
  BannerType.success,
  BannerType.warning,
]

const typeMap = {
  danger: 'warning-ring-28',
  generic: 'logo-block-28',
  info: 'info-ring-28',
  success: 'success-ring-28',
  warning: 'warning-ring-28',

}

types.forEach((type) => {
  storiesOf(`HKBanner/${type}`, module)
    .add(`default`, () => (
      <HKBanner icon={typeMap[type]} type={type} >Lorem ipsum dolor sit amet.</HKBanner>
    ))
    .add(`with title`, () => (
      <HKBanner icon={typeMap[type]} type={type} title='This is the title line'>Lorem ipsum dolor sit amet.</HKBanner>
    ))
    .add(`with button`, () => (
      <HKBanner icon={typeMap[type]} type={type} buttonText='Click Me' onClick={action('clicked')}>Lorem ipsum dolor sit amet.</HKBanner>
    ))
    .add(`with title and button`, () => (
      <HKBanner icon={typeMap[type]} type={type} title='This is the title line' buttonText='Click Me' onClick={action('clicked')}>Lorem ipsum dolor sit amet.</HKBanner>
    ))
    .add(`with className`, () => (
      <HKBanner className='pv5' icon={typeMap[type]} type={type} title='This is the title line' buttonText='Click Me' onClick={action('clicked')}>Lorem ipsum dolor sit amet.</HKBanner>
    ))
})
