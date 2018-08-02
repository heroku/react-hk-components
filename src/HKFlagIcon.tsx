import * as React from 'react'
import * as RetinaImage from 'react-retina-image'

export enum Regions {
  australia = 'australia',
  brazil = 'brazil',
  default = 'default',
  europe = 'europe',
  germany = 'germany',
  ireland = 'ireland',
  japan = 'japan',
  private = 'private',
  singapore = 'singapore',
  united_states = 'united-states',
}

interface IFlagIconProps {
  region: Regions,
  basePath?: string,
}

export default class HKFlagIcon extends React.Component<IFlagIconProps> {
  private static defaultProps = {
    basePath: '/static/dist/flags/',
  }
  public render () {
    return (<RetinaImage src={`${this.props.basePath}region-${this.props.region}.png`} />)
  }
}
