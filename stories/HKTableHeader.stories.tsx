import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  default as HKTableHeader,
} from '../src/HKTableHeader'

const unsorted = {
  desc: true,
  id: 'another-one',
}

const desc = {
  desc: true,
  id: 'title',
}

const asc = {
  desc: false,
  id: 'title',
}

storiesOf('HKTableHeader', module)
  .add(`Unsorted`, () => (
    <HKTableHeader label='Title' id='title' sort={unsorted} />
  ))
  .add(`Desc`, () => (
    <HKTableHeader label='Title' id='title' sort={desc} />
  ))
  .add(`Asc`, () => (
    <HKTableHeader label='Title' id='title' sort={asc} />
  ))
