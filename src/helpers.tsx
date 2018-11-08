import * as d3array from 'd3-array'
import unzip from 'lodash-es/unzip'

export function getMaxValues (data, type = 'line') {
  if (!data) {
    return null
  }

  if (type === 'line') {
    data = data.map((d) => d[1])
  }

  const values = unzip(data)
  const maxValues = values.map((value) => d3array.max(value))
  return maxValues
}

export function getNumVisibleCharts (toggleInfo) {
  return Object.keys(toggleInfo)
    .map((key) => toggleInfo[key])
    .reduce((count, toggled) => toggled ? ++count : count, 0)
}

export function prettier (size) {
  if (size === 0) {
    return '0'
  }
  const units = ['K', 'M', 'B', 'T', 'q', 'Q']
  let unit = ''
  while (size >= 1000 && units.length > 0) {
    size /= 1000
    unit = units.shift() || ''
  }
  size = size.toFixed(1).replace(/\.0$/, '')
  return `${size}${unit}`
}
