# ESLint & Prettier Configuration

This project uses ESLint and Prettier for code quality and formatting, with Husky for pre-commit hooks.

## Setup

### Installation

All dependencies are already configured in `package.json`. Install them with:

```bash
npm install
# or
yarn install
# or
pnpm install
```

The `prepare` script will automatically install Husky hooks during installation.

## Configuration Files

### `.eslintrc.json`
- **Purpose**: Defines ESLint rules for code quality
- **Includes**:
  - React Native best practices
  - TypeScript support
  - Jest testing environment
  - Prettier integration to avoid conflicts
- **Key Rules**:
  - Warns on `console.log()` (allows `warn` and `error`)
  - Enforces TypeScript strict mode recommendations
  - Disables React prop-types (using TypeScript instead)
  - Warns on unused variables (with underscore prefix exception)

### `.prettierrc.json`
- **Purpose**: Defines code formatting rules
- **Settings**:
  - Print width: 100 characters
  - Tab width: 2 spaces
  - Single quotes for strings
  - Trailing commas: ES5 compatible
  - Line endings: LF (Unix)

### `.lintstagedrc.json`
- **Purpose**: Configures lint-staged for pre-commit hooks
- **Runs**:
  - ESLint with auto-fix on `.ts` and `.tsx` files
  - Prettier formatting on all staged files

### `.husky/pre-commit`
- **Purpose**: Git pre-commit hook
- **Runs**: `lint-staged` to lint and format staged files before commit

## Available Scripts

### Linting

```bash
# Run ESLint on src directory
npm run lint

# Run ESLint with auto-fix
npm run lint:fix
```

### Formatting

```bash
# Format all source files with Prettier
npm run format

# Check formatting without making changes
npm run format:check
```

### Type Checking

```bash
# Run TypeScript type checker
npm run type-check
```

## Pre-commit Hooks

When you commit code, Husky automatically runs:
1. `lint-staged` which:
   - Runs ESLint with `--fix` on staged TypeScript/JavaScript files
   - Runs Prettier on staged files
   - Stages any auto-fixed changes

If linting or formatting fails, the commit is blocked until issues are resolved.

## IDE Integration

### VS Code

Install these extensions for best experience:
- **ESLint**: `dbaeumer.vscode-eslint`
- **Prettier**: `esbenp.prettier-vscode`

Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Troubleshooting

### Husky hooks not running

If pre-commit hooks aren't running:

```bash
# Reinstall Husky
npm run prepare

# Or manually:
npx husky install
```

### ESLint not finding files

Ensure you're running commands from the project root directory.

### Prettier conflicts with ESLint

The ESLint config extends `prettier` to disable conflicting rules. If you see conflicts:

```bash
# Run both in sequence
npm run lint:fix && npm run format
```

## Best Practices

1. **Before committing**: Run `npm run lint:fix` and `npm run format` to auto-fix issues
2. **Type safety**: Run `npm run type-check` to catch TypeScript errors
3. **Testing**: Run `npm test` to ensure tests pass
4. **Full check**: Run `npm run lint && npm run format:check && npm run type-check && npm test`

## References

- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [React Native ESLint Plugin](https://github.com/intellicode/eslint-plugin-react-native)
- [TypeScript ESLint](https://typescript-eslint.io/)
