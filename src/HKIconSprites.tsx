import * as React from 'react'
import SVG from 'react-inlinesvg'

export enum SpriteSet {
  Marketing = 'marketing',
}

interface ISpriteProps {
  set?: SpriteSet
  version?: string
}

const HKIconSprites: React.FunctionComponent<ISpriteProps> = ({
  version,
  set,
}) => {
  const file = set ? `${set}/sprite.svg` : 'sprite.svg'
  const src = `https://www.herokucdn.com/malibu/${version}/${file}`
  return <SVG id='spritesheet' uniquifyIDs={false} src={src} />
}

HKIconSprites.defaultProps = {
  version: 'latest',
}
HKIconSprites.displayName = 'HKIconSprites'
export default HKIconSprites
