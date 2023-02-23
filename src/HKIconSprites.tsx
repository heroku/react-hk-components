import * as React from 'react'
import SVG from 'react-inlinesvg'

export enum Sprites {
  Product = '',
  Marketing = 'marketing',
}

interface ISpriteProps {
  set?: Sprites
  version?: string
}

const HKIconSprites: React.FunctionComponent<ISpriteProps> = ({
  version,
  set,
}) => {
  const file = set ? `${set}/sprite.svg` : 'sprite.svg'
  const src = `https://www.herokucdn.com/malibu/${version}/${file}`
  return <SVG uniquifyIDs={false} src={src} />
}

HKIconSprites.defaultProps = {
  set: Sprites.Product,
  version: 'latest',
}
HKIconSprites.displayName = 'HKIconSprites'
export default HKIconSprites
