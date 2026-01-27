import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';

import type { FlatConfigArray } from '../types.js';

export function createBackendConfig(): FlatConfigArray {
	return [
		// Node.js plugin recommended config
		nodePlugin.configs['flat/recommended'],

		// Node.js environment and rules
		{
			languageOptions: {
				globals: {
					...globals.node,
					...globals.es2021,
				},
			},
			rules: {
				// Console logging rules for backend
				'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

				// Node.js specific rules (targeting Node 20+)
				'n/no-unsupported-features/node-builtins': ['error', { version: '>=20.0.0' }],
				'n/no-unsupported-features/es-syntax': 'off', // TypeScript handles this
				'n/no-missing-import': 'off', // TypeScript handles this
				'n/no-unpublished-import': 'off', // Often triggers false positives

				// Prefer modern patterns
				'n/prefer-promises/fs': 'error',
				'n/prefer-promises/dns': 'error',
			},
		},

		// Disable browser globals for backend
		{
			languageOptions: {
				globals: {
					window: 'off',
					document: 'off',
				},
			},
		},
	] as FlatConfigArray;
}

export const backend = createBackendConfig();
