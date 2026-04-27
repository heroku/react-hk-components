import { getMaxValues, getNumVisibleCharts, prettier } from '../src/helpers'

describe('getMaxValues', () => {
  it('get max values for bar chart data', () => {
    const lineChartData = [
      ['2015-04-23 17:18:06.074707+00',
      [92048, 493280, 34934]],
      ['2015-04-21 17:51:39.113926+00',
      [93312, 494500, 234343]],
      ['2015-04-21 16:42:21.010869+00',
      [93860, 478796, 100345]],
      ['2015-04-23 17:19:06.083126+00',
      [95056, 899412, 10000]]]

    const maxValues = getMaxValues(lineChartData, 'line')
    expect(maxValues).toEqual([ 95056, 899412, 234343 ])
  })

  it('get max values for line chart data', () => {
    const barChartData = [
    [197496, 1243496],
    [208380, 1245496],
    [218472, 1243700],
    [227100, 1243700],
    [227168, 1243700],
    [227804, 943700],
    [228052, 1243700],
    [235560, 1243700],
    [242152, 1113700]]
    const maxValues = getMaxValues(barChartData, 'bar')
    expect(maxValues).toEqual([ 242152, 1245496 ])
  })
})

describe('getNumVisibleCharts', () => {
  it('returns the number of charts that are toggled on', () => {
    const toggleInfo = {
      0: true,
      1: true,
      2: false,
    }

    const numVisibleCharts = getNumVisibleCharts(toggleInfo)
    expect(numVisibleCharts).toEqual(2)
  })
})

describe('prettier', () => {
  it('returns the condensed version of a specific value', () => {
    const values = [
      0,
      999,
      1000,
      10000,
      100000,
      1000000,
    ]

    const condensedValues = [
      '0',
      '999',
      '1K',
      '10K',
      '100K',
      '1M',
    ]

    values.forEach((v,i) => {
      expect(prettier(v)).toEqual(condensedValues[i])
    })
  })
})

describe('postcss override (GHSA advisory 1117015)', () => {
  it('resolves to a version that escapes </style> in stringify output', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const postcss = require('postcss')
    const pkg = require('postcss/package.json')

    const [maj, min, patch] = pkg.version.split('.').map((n: string) => parseInt(n, 10))
    const atLeast = maj > 8 || (maj === 8 && (min > 5 || (min === 5 && patch >= 10)))
    expect(atLeast).toBe(true)

    const root = postcss.parse('a { content: "</style>" }')
    const out = root.toString()
    expect(out).not.toContain('</style>')
  })
})
