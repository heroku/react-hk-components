import * as d3array from 'd3-array'
import * as _ from 'lodash'

export function getMaxValues (data, type = 'line') {
  if (!data) {
    return null
  }

  if (type === 'line') {
    data = data.map((d) => d[1])
  }

  const values = _.unzip(data)
  const maxValues = values.map((value) => d3array.max(value))
  return maxValues
}
