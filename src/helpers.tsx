import * as d3array from 'd3-array'
import * as _ from 'lodash'

export function getMaxValues (data) {
  if (!data) {
    return null
  }

  const values = _.unzip(_.map(data, (d) => d[1]))
  const maxValues = values.map((value) => d3array.max(value))
  return maxValues
}
