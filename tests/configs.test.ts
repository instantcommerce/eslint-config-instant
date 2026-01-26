import { describe, it, expect } from 'vitest';

import { instant, createBaseConfig, createReactConfig, createBackendConfig } from '../src/index.js';

describe('instant()', () => {
	it('returns an array of configs', () => {
		const config = instant();
		expect(Array.isArray(config)).toBe(true);
		expect(config.length).toBeGreaterThan(0);
	});

	it('includes ignores config', () => {
		const config = instant();
		const ignoresConfig = config.find((c) => c.ignores && !c.rules);
		expect(ignoresConfig).toBeDefined();
		expect(ignoresConfig?.ignores).toContain('**/node_modules/**');
	});

	it('adds custom ignores', () => {
		const config = instant({ ignores: ['**/custom/**'] });
		const ignoresConfig = config.find((c) => c.ignores && !c.rules);
		expect(ignoresConfig?.ignores).toContain('**/custom/**');
	});

	it('generates library config by default', () => {
		const config = instant();
		// Library config should not include React or Node specific configs
		const hasReactPlugin = config.some((c) => c.plugins?.['react-hooks']);
		const hasNodePlugin = config.some((c) => c.plugins?.n);
		expect(hasReactPlugin).toBe(false);
		expect(hasNodePlugin).toBe(false);
	});

	it('generates react config when type is react', () => {
		const config = instant({ type: 'react' });
		const hasReactHooksPlugin = config.some((c) => c.plugins?.['react-hooks']);
		expect(hasReactHooksPlugin).toBe(true);
	});

	it('generates backend config when type is backend', () => {
		const config = instant({ type: 'backend' });
		const hasNodePlugin = config.some((c) => c.plugins?.n);
		expect(hasNodePlugin).toBe(true);
	});
});

describe('createBaseConfig()', () => {
	it('returns an array of configs', () => {
		const config = createBaseConfig();
		expect(Array.isArray(config)).toBe(true);
	});

	it('includes import-x plugin', () => {
		const config = createBaseConfig();
		const hasImportPlugin = config.some((c) => c.plugins?.['import-x']);
		expect(hasImportPlugin).toBe(true);
	});

	it('accepts custom tsconfig path', () => {
		const config = createBaseConfig({ tsconfig: './tsconfig.custom.json' });
		const importConfig = config.find((c) => c.settings?.['import-x/resolver']);
		expect(importConfig?.settings?.['import-x/resolver']?.typescript?.project).toBe(
			'./tsconfig.custom.json',
		);
	});
});

describe('createReactConfig()', () => {
	it('returns an array of configs', () => {
		const config = createReactConfig();
		expect(Array.isArray(config)).toBe(true);
	});

	it('includes a11y by default', () => {
		const config = createReactConfig();
		const hasA11y = config.some(
			(c) => c.rules && Object.keys(c.rules).some((rule) => rule.startsWith('jsx-a11y/')),
		);
		expect(hasA11y).toBe(true);
	});

	it('excludes a11y when disabled', () => {
		const config = createReactConfig({ features: { a11y: false } });
		const hasA11y = config.some(
			(c) => c.rules && Object.keys(c.rules).some((rule) => rule.startsWith('jsx-a11y/')),
		);
		expect(hasA11y).toBe(false);
	});
});

describe('createBackendConfig()', () => {
	it('returns an array of configs', () => {
		const config = createBackendConfig();
		expect(Array.isArray(config)).toBe(true);
	});

	it('includes node plugin', () => {
		const config = createBackendConfig();
		const hasNodePlugin = config.some((c) => c.plugins?.n);
		expect(hasNodePlugin).toBe(true);
	});
});
