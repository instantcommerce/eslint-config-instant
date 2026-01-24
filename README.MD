# ⚙️ eslint-config-instant

A modern, shareable ESLint flat config for Instant Commerce projects. Built with ESLint v9, TypeScript ESLint v8, and bundled plugins for zero-config setup.

## Quick Start

### Option 1: Interactive Setup (Recommended)

```bash
npx eslint-config-instant init
```

This will guide you through setting up ESLint with interactive prompts for project type, TypeScript, aliases, and more.

### Option 2: Manual Setup

```bash
pnpm add -D eslint-config-instant eslint
# For TypeScript projects:
pnpm add -D typescript
```

Create `eslint.config.ts`:

```typescript
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'react', // or 'backend' or 'library'
});
```

That's it! All plugins are bundled - no need to install 10+ packages.

## Presets

### React (`type: 'react'`)

Full React/Next.js/Remix setup with:
- React & React Hooks rules
- JSX accessibility (a11y) rules
- TypeScript support
- Import ordering
- Prettier integration

```typescript
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'react',
});
```

### Backend (`type: 'backend'`)

Node.js backend configuration with:
- Node.js best practices
- TypeScript support
- Import ordering
- Console logging rules
- Prettier integration

```typescript
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'backend',
});
```

### Library (`type: 'library'`)

Minimal config for publishable packages:
- TypeScript support
- Import ordering
- Prettier integration

```typescript
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'library',
});
```

## Customization

### Path Aliases

Configure import aliases for your project:

```typescript
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'react',
  aliases: {
    '~components': './src/components',
    '~hooks': './src/hooks',
    '@lib': './src/lib',
  },
});
```

**Note:** The config automatically reads `tsconfig.json` paths, so you may not need to specify aliases manually.

### TypeScript Config

Specify custom TypeScript config path(s):

```typescript
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'react',
  tsconfig: './tsconfig.app.json', // or ['./tsconfig.app.json', './tsconfig.node.json']
});
```

### Feature Flags

Enable/disable specific rule sets:

```typescript
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'react',
  features: {
    a11y: true,        // JSX accessibility rules (default: true for react)
    mdx: false,        // MDX file support (default: false)
    vitest: false,     // Vitest rules (default: false)
  },
});
```

### Custom Ignores

Add additional ignore patterns:

```typescript
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'react',
  ignores: ['**/generated/**', '**/*.generated.ts'],
});
```

### Prettier Configuration

The config includes `eslint-config-prettier` to disable conflicting rules. For formatting, use Prettier separately:

**Option 1: Use exported Prettier config**

Create `.prettierrc.js`:

```javascript
import { prettierConfig } from 'eslint-config-instant/prettier';
export default prettierConfig;
```

**Option 2: Custom Prettier config**

Create your own `.prettierrc.js` with your preferred settings.

## VS Code Setup

1. Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Add to your VS Code `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.formatOnSave": false
  },
  "[typescriptreact]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Migration from v0.x

### Before (v0.x)

```json
// package.json
{
  "eslintConfig": {
    "extends": ["instant/react"]
  }
}
```

Required installing 10+ peer dependencies manually.

### After (v1.x)

```typescript
// eslint.config.ts
import { instant } from 'eslint-config-instant';

export default instant({
  type: 'react',
});
```

Only requires `eslint-config-instant` and `eslint` (and `typescript` for TS projects).

### Migration Steps

1. **Remove old config** - Delete `.eslintrc`, `.eslintrc.js`, or `eslintConfig` from `package.json`
2. **Install new version** - `pnpm add -D eslint-config-instant@latest eslint`
3. **Create `eslint.config.ts`** - Use the examples above
4. **Remove old dependencies** - Uninstall old peer dependencies:
   ```bash
   pnpm remove eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-import eslint-import-resolver-alias eslint-plugin-react-hooks eslint-plugin-mdx
   ```
5. **Update scripts** - Your `package.json` scripts should still work:
   ```json
   {
     "scripts": {
       "lint": "eslint .",
       "lint:fix": "eslint . --fix"
     }
   }
   ```

## Troubleshooting

### "Cannot find module 'eslint-config-instant'"

Make sure you've installed the package:
```bash
pnpm add -D eslint-config-instant eslint
```

### TypeScript errors in `eslint.config.ts`

Ensure you have TypeScript installed:
```bash
pnpm add -D typescript
```

### Import resolution errors

The config uses `eslint-import-resolver-typescript` which reads your `tsconfig.json` paths. Make sure your `tsconfig.json` has proper `paths` configured:

```json
{
  "compilerOptions": {
    "paths": {
      "~components/*": ["./src/components/*"],
      "~hooks/*": ["./src/hooks/*"]
    }
  }
}
```

### ESLint not running in VS Code

1. Ensure the ESLint extension is installed
2. Reload VS Code window (`Cmd+Shift+P` → "Reload Window")
3. Check the ESLint output panel for errors

## Requirements

- Node.js >= 20
- ESLint >= 9.0.0
- TypeScript >= 5.0.0 (for TypeScript projects)

## License

MIT
