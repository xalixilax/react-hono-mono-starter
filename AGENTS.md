# Agens guidelines

## Development guidelines

- you **MUST** use `pnpm` avec any command insite this repository.
- You **SHOULD** use the package name when yo need to execute a command inside a package. (Ex.: `pnpm --filter web dev`)
- You **MUST** run `pnpm ai` after every changes to validate your work
- You **MUST NOT** duplicate utility logic. When a function could reasonably be reused elsewhere, you **MUST** extract it to the shared utilities location. Before creating a new utility, you **MUST** verify that an equivalent implementation does not already exist. Reuse, extend, or refactor existing utilities whenever possible.
- You **MUST NOT** use barrel files

## Standard

- File case **MUST** be `kebab-case`
- Every files **MUST** use typescript
- You **SHOULD** never use `as` for type assertion
- you **MUST** never use `any` for type definition
- i18n key **MUST** be in `SCREAMING_SNAKE_CASE`
- Every string directed to a user **MUST** be translated using i18n

## Task Management

- You **MUST** use `dex` skill for task coordination. See `.github/skills/dex/SKILL.md`
- You **MUST** use `dex-plan` skill for creating tasks from planning docs. See `.github/skills/dex-plan/SKILL.md`
- You **MUST** set temporary files, like console outputs, into `.tmp` folders
