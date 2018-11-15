import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import { themes } from '@storybook/components'

import React from 'react'
import { MalibuSprites } from '@heroku/react-malibu'

// automatically import all files ending in *.stories.ts and *.stories.tsx
const req = require.context('../stories', true, /.stories.tsx?$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(
  withOptions({
    name: 'HK Components',
    theme: {
      ...themes.normal,
      mainBackground: '#eef1f6 linear-gradient(to bottom right, #eef1f6,#FFFFFF)',
      mainBorderColor: '#f7f8fb',
      mainTextFace: 'Salesforce Sans'
    }
  })
)

addDecorator((storyFn) => {
  return (<div>
    <MalibuSprites />
    { storyFn() }
    </div>)
})

configure(loadStories, module)
