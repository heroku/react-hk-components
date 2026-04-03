## Summary

Fixes 1 **critical** severity 3PP vulnerability in `handlebars` (GHSA-2w6w-674q-4c4q / CVE-2026-33937).

Handlebars versions >=4.0.0 <=4.7.8 are vulnerable. The fix upgrades `ts-jest` (which transitively pulls in `handlebars`) so that the lockfile re-resolves to a patched version (>=4.7.9).

## Changes

### package.json
Bumped `ts-jest` version specifier from `^29.2.5` to `^29.4.9` in `devDependencies`. The previous specifier technically covered 29.4.7+ (the minimum fix version), but the lockfile had resolved `ts-jest` to 29.4.1 which bundled vulnerable `handlebars@4.7.8`. Bumping the specifier floor forces re-resolution.

**Why upgrade instead of override?** `handlebars` is a 1-hop transitive dependency of `ts-jest` (chain: `ts-jest` -> `handlebars`). Upgrading the parent re-resolves its transitive dependencies, pulling in the patched `handlebars`. No override is needed because `ts-jest` is actively maintained and not deprecated.

### Lockfile
Lockfile re-resolved to pull in `ts-jest@29.4.9` with patched transitive dependencies.

## Vulnerabilities Fixed

| CVE/GHSA | Package | Severity | Fixed Version |
|----------|---------|----------|---------------|
| GHSA-2w6w-674q-4c4q / CVE-2026-33937 | handlebars | critical | >=4.7.9 |

## Validation

- Tests: PASS (4/4)
- Lint: PASS (0 errors, 59 pre-existing warnings)
- Build: PASS

## Notes

- Dependency chain: `@heroku/react-hk-components` -> `ts-jest` -> `handlebars`
- `handlebars` is transitive-only (no source files import it directly)
- `ts-jest` is a devDependency, so this vulnerability only affects development/CI environments
