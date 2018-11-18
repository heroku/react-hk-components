import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import React from 'react'
import heroku from './heroku-theme'
// import { MalibuSprites } from '@heroku/react-malibu'

// automatically import all files ending in *.stories.ts and *.stories.tsx
const req = require.context('../stories', true, /.stories.tsx?$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(
  withOptions({
    name: 'HK Components',
    url: 'https://github.com/heroku/react-hk-components',
    theme: heroku
  })
)

addDecorator((storyFn) => {
  return (<div>
    {/* <MalibuSprites /> */}
    { storyFn() }
    </div>)
})

configure(loadStories, module)
