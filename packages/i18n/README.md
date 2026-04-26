# i18n package

Centralized translations for the monorepo live in this package.

## Structure

- `src/locales/<language>/<namespace>.ts`: source-of-truth translations
- `src/bundles/*.ts`: package-oriented bundles you can import selectively
- `src/index.ts`: helpers for composing runtime i18next resources

## Adding package translations

1. Add a new namespace file per language in `src/locales`.
2. Create a bundle in `src/bundles` for that namespace.
3. Export the bundle from `src/index.ts` and `package.json` if it should be imported directly.

The default web application namespace is `web`.