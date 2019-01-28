import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Select from 'react-select'
import { Fills } from '../src'
import { MarketingIcons, ProductIcons } from '../src'
import { default as HKIcon } from '../src/HKIcon'

const ColorOption = props => {
  return (
    <div style={props.getStyles('option', props)} {...props.innerProps}>
      <div className='flex items-center'>
        <svg width={16} height={16} className={props.value}>
          <rect width='100%' height='100%' />
        </svg>
        <span className='ml2'>{props.label}</span>
      </div>
    </div>
  )
}

const IconOption = props => {
  return (
    <div style={props.getStyles('option', props)} {...props.innerProps}>
      <div className='flex items-center'>
        <HKIcon name={props.value} size={16} />
        <span className='ml2'>{props.label}</span>
      </div>
    </div>
  )
}

const fillNames = Object.keys(Fills)
const fillOptions = fillNames.map(n => ({
  label: n,
  value: Fills[n],
}))

const productIconNames = Object.keys(ProductIcons)
const productIconOptions = productIconNames.map(n => ({
  label: n,
  value: ProductIcons[n],
}))

const marketingIconNames = Object.keys(MarketingIcons)
const marketingIconOptions = marketingIconNames.map(n => ({
  label: n,
  value: MarketingIcons[n],
}))

interface IPickerProps {
  icons: any
}

interface IPickerState {
  selectedColor: any
  selectedIcon: any
}

class IconPicker extends React.Component<IPickerProps, IPickerState> {
  public state = {
    selectedColor: fillOptions[0],
    selectedIcon: this.props.icons[0],
  }

  public handleIconChange = selectedIcon => {
    this.setState({
      selectedIcon,
    })
  }

  public handleColorChange = selectedColor => {
    this.setState({
      selectedColor,
    })
  }

  public render() {
    const { selectedIcon, selectedColor } = this.state
    return (
      <div className='flex'>
        <div className='flex-1 bg-light-silver h6 flex items-center justify-center ba b--silver'>
          <HKIcon
            fill={selectedColor.value}
            name={selectedIcon.value}
            size={28}
          />
        </div>
        <div className='flex-1 pl4'>
          <div className='mb4'>
            <label className='mb2 db'>Choose an Icon:</label>
            <Select
              components={{ Option: IconOption }}
              onChange={this.handleIconChange}
              options={this.props.icons}
              value={selectedIcon}
            />
          </div>
          <div>
            <label className='mb2 db'>Choose a Color:</label>
            <Select
              components={{ Option: ColorOption }}
              onChange={this.handleColorChange}
              options={fillOptions}
              value={selectedColor}
            />
          </div>
        </div>
      </div>
    )
  }
}

storiesOf('HKIcon', module)
  .add('Product NO_STORYSHOTS', () => <IconPicker icons={productIconOptions} />)
  .add('Marketing NO_STORYSHOTS', () => (
    <IconPicker icons={marketingIconOptions} />
  ))
