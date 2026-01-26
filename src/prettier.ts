import type { PrettierOptions } from './types.js';

/**
 * Base Prettier options (printWidth: 100)
 */
export const basePrettierOptions: PrettierOptions = {
	printWidth: 100,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
};

/**
 * React/Frontend Prettier options (printWidth: 80)
 */
export const reactPrettierOptions: PrettierOptions = {
	printWidth: 80,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
};

/**
 * Backend Prettier options (printWidth: 120, arrowParens: avoid)
 */
export const backendPrettierOptions: PrettierOptions = {
	printWidth: 120,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
	arrowParens: 'avoid',
};
