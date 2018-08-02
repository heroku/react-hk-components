import * as React from 'react'

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
  basePath?: string,
  className?: string,
  region: Regions,
}

export default class HKFlagIcon extends React.Component<IFlagIconProps> {
  public static defaultProps = {
    basePath: '/static/dist/flags/',
    className: '',
  }
  public render () {
    const { className, basePath, region } = this.props
    const src = `${basePath}region-${region}`
    return (<img src={`${src}.png`} srcSet={`${src}.png 1x, ${src}@2x.png 2x`} className={className} />)
  }
}
