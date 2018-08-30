import { configure, addDecorator } from '@storybook/react'
import React from 'react'

import { MalibuSprites } from '@heroku/react-malibu'

// automatically import all files ending in *.stories.ts and *.stories.tsx
const req = require.context('../stories', true, /.stories.tsx?$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator((storyFn) => {
  return (<div>
    <MalibuSprites />
    { storyFn() }
    </div>)
})


configure(loadStories, module)
