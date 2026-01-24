import type { PrettierOptions } from './types.js';

/**
 * Default Prettier configuration for Instant projects.
 * Use in .prettierrc.js:
 *
 * ```js
 * import { prettierConfig } from 'eslint-config-instant/prettier';
 * export default prettierConfig;
 * ```
 */
export const prettierConfig: PrettierOptions = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  arrowParens: 'always',
  bracketSpacing: true,
};
