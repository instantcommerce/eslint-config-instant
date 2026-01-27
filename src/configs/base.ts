import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import type { InstantConfig, FlatConfigArray } from '../types.js';

export function createBaseConfig(options: InstantConfig = {}): FlatConfigArray {
	const { tsconfig = './tsconfig.json', aliases } = options;

	return tseslint.config(
		// Recommended ESLint rules
		eslint.configs.recommended,

		// TypeScript ESLint recommended rules
		...tseslint.configs.recommended,

		// Import plugin configuration
		{
			plugins: {
				'import-x': importX as unknown as Record<string, unknown>,
			},
			settings: {
				'import-x/resolver': {
					typescript: {
						alwaysTryTypes: true,
						project: tsconfig,
					},
					...(aliases && {
						alias: {
							map: Object.entries(aliases),
							extensions: ['.js', '.jsx', '.ts', '.tsx'],
						},
					}),
				},
			},
			rules: {
				// Import ordering
				'import-x/order': [
					'error',
					{
						groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
						'newlines-between': 'always',
						alphabetize: { order: 'asc', caseInsensitive: true },
					},
				],
				'import-x/no-duplicates': 'error',
				'import-x/no-unresolved': 'error',
				'import-x/first': 'error',
			},
		},

		// TypeScript-specific rules
		{
			files: ['**/*.{ts,tsx}'],
			rules: {
				'no-undef': 'off', // TypeScript handles undefined variable checking
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
				],
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{
						args: 'none',
						ignoreRestSiblings: true,
						varsIgnorePattern: '_',
					},
				],
				'@typescript-eslint/no-unused-expressions': [
					'error',
					{
						allowShortCircuit: true,
						allowTernary: true,
						allowTaggedTemplates: true,
					},
				],
				'@typescript-eslint/no-explicit-any': 'warn',
				'@typescript-eslint/no-empty-object-type': 'off',
				'@typescript-eslint/no-namespace': 'off',
			},
		},

		// General JavaScript rules
		{
			languageOptions: {
				globals: {
					...globals.es2022,
				},
			},
			rules: {
				'no-console': ['error', { allow: ['warn', 'error'] }],
				eqeqeq: ['error', 'smart'],
				'no-eval': 'error',
				'no-var': 'error',
				'prefer-const': 'error',
				'prefer-template': 'error',
				'object-shorthand': 'error',
			},
		},

		// Prettier config to disable conflicting rules (must be last)
		prettierConfig,
	) as FlatConfigArray;
}

export const base: FlatConfigArray = createBaseConfig();
