// @ts-expect-error - no types available
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import type { InstantConfig, FlatConfigArray } from '../types.js';

export function createReactConfig(options: InstantConfig = {}): FlatConfigArray {
  const { features = {} } = options;
  const enableA11y = features.a11y !== false; // Default true for React

  const configs: FlatConfigArray = [
    // React plugin recommended config
    {
      files: ['**/*.{jsx,tsx}'],
      plugins: {
        react: reactPlugin,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactPlugin.configs['jsx-runtime'].rules,
      },
    },

    // React Hooks plugin
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
        'react-hooks': reactHooks,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-hooks/exhaustive-deps': 'warn',
      },
    },

    // React-specific rule overrides
    {
      files: ['**/*.{jsx,tsx}'],
      rules: {
        'react/prop-types': 'off', // TypeScript handles this
        'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'warn',
        'react/no-direct-mutation-state': 'error',
        'react/self-closing-comp': 'error',
      },
    },

    // Import ordering with React at the top
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      rules: {
        'import-x/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
              {
                pattern: 'react-dom',
                group: 'external',
                position: 'before',
              },
              {
                pattern: 'react-dom/**',
                group: 'external',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react', 'react-dom'],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
      },
    },
  ];

  // Add accessibility rules if enabled
  if (enableA11y) {
    configs.push({
      files: ['**/*.{jsx,tsx}'],
      ...jsxA11y.flatConfigs.recommended,
      rules: {
        ...jsxA11y.flatConfigs.recommended.rules,
        'jsx-a11y/anchor-is-valid': 'warn',
      },
    });
  }

  return configs;
}

export const reactConfig = createReactConfig();
