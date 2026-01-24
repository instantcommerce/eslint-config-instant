import type { Linter } from 'eslint';

export interface PrettierOptions {
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
  semi?: boolean;
  singleQuote?: boolean;
  trailingComma?: 'none' | 'es5' | 'all';
  bracketSpacing?: boolean;
  arrowParens?: 'avoid' | 'always';
}

export interface InstantConfigFeatures {
  /** Enable accessibility rules (jsx-a11y) - default: true for react */
  a11y?: boolean;
  /** Enable MDX file support - default: false */
  mdx?: boolean;
  /** Enable testing-library rules - default: false */
  testingLibrary?: boolean;
  /** Enable vitest rules - default: false */
  vitest?: boolean;
}

export interface InstantConfig {
  /** Project type determines which rule sets to include */
  type?: 'react' | 'backend' | 'library';

  /** TypeScript config path(s) for type-aware linting - auto-detected if not provided */
  tsconfig?: string | string[];

  /** Path aliases for import resolution (in addition to tsconfig paths) */
  aliases?: Record<string, string>;

  /** Prettier options - used when prettier feature is enabled */
  prettier?: PrettierOptions;

  /** Additional ignore patterns */
  ignores?: string[];

  /** Enable/disable specific rule sets */
  features?: InstantConfigFeatures;
}

export type FlatConfig = Linter.Config;
export type FlatConfigArray = Linter.Config[];
