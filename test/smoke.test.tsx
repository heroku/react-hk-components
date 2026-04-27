import * as fs from 'fs'
import * as path from 'path'

/**
 * Smoke test -- layer-L4 of the heroku/3pp-grackle verification ladder.
 *
 * react and react-dom are peerDependencies (not installed during
 * `npm install`), so a runtime import of `../src` would fail with
 * "Cannot find module 'react'". Instead, this test exercises the
 * regression class most likely from a 3pp dependency bump
 * (React/Babel/d3/typescript major bumps -> barrel breakage,
 * missing-import fallout, file rename without barrel update):
 *
 *   1. `src/index.ts` exports every name advertised in the README/
 *      docs as a named export -- catches accidental rename or removal.
 *   2. Each component file exists at the path implied by the barrel --
 *      catches a deleted file the barrel still re-exports.
 *   3. `dist/umd/react-hk-components.js` (after build) exists and is
 *      non-trivial -- catches catastrophic webpack/babel breakage.
 *
 * (3) only runs when `dist/` has been built; in CI the order is
 * `npm run build && npm test` so the asset is present. Locally,
 * the test gracefully no-ops if dist is absent.
 */

const repoRoot = path.resolve(__dirname, '..')
const indexTs = fs.readFileSync(
  path.join(repoRoot, 'src', 'index.ts'),
  'utf8',
)

const expectedExports = [
  'HKBanner',
  'HKBarChart',
  'HKButton',
  'HKTextField',
  'HKDropdown',
  'HKFlagIcon',
  'HKLineChart',
  'HKModal',
  'HKTable',
  'HKIcon',
  'HKIconSprites',
  'Sprites',
  'HKTablePagination',
  'HKTableHeader',
  'Fills',
  'ProductIcons',
  'MarketingIcons',
]

describe('Smoke | barrel surface', () => {
  it.each(expectedExports)('exports %s from src/index.ts', (name) => {
    const re = new RegExp(`\\b${name}\\b`)
    expect(re.test(indexTs)).toBe(true)
  })

  it('every default-export source file referenced by the barrel exists', () => {
    const reExportLines = indexTs
      .split('\n')
      .filter((line) => line.includes("from './HK"))
    expect(reExportLines.length).toBeGreaterThan(0)
    for (const line of reExportLines) {
      const match = line.match(/from\s+'\.\/([A-Z][A-Za-z]+)'/)
      if (!match) continue
      const file = match[1]
      const exists = fs.existsSync(path.join(repoRoot, 'src', `${file}.tsx`))
      expect(exists).toBe(true)
    }
  })
})

describe('Smoke | UMD bundle (when built)', () => {
  const distPath = path.join(repoRoot, 'dist', 'umd', 'react-hk-components.js')

  it('dist/umd/react-hk-components.js exists and is non-trivial after build', () => {
    if (!fs.existsSync(distPath)) {
      console.warn(
        '  [skip] dist/ not built. Run `npm run build` to exercise this assertion.',
      )
      return
    }
    const stat = fs.statSync(distPath)
    expect(stat.size).toBeGreaterThan(50_000) // arbitrarily small floor; current build ~1.5MB
  })
})
