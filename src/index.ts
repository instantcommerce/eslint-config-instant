import { createBackendConfig } from './configs/backend.js';
import { createBaseConfig } from './configs/base.js';
import { createReactConfig } from './configs/react.js';
import type { InstantConfig, FlatConfigArray } from './types.js';

export type {
	InstantConfig,
	PrettierOptions,
	InstantConfigFeatures,
	FlatConfigArray,
} from './types.js';
export type { FlatConfig } from './types.js';
export { basePrettierOptions, reactPrettierOptions, backendPrettierOptions } from './prettier.js';
export { createBaseConfig, base } from './configs/base.js';
export { createReactConfig, reactConfig } from './configs/react.js';
export { createBackendConfig, backend } from './configs/backend.js';

/**
 * Creates an ESLint flat config for Instant Commerce projects.
 *
 * @example
 * ```ts
 * // eslint.config.ts
 * import { instant } from 'eslint-config-instant';
 *
 * export default instant({
 *   type: 'react',
 *   features: {
 *     a11y: true,
 *     vitest: true,
 *   },
 * });
 * ```
 */
export function instant(options: InstantConfig = {}): FlatConfigArray {
	const { type = 'library', ignores = [] } = options;

	const configs: FlatConfigArray = [];

	// Global ignores
	if (ignores.length > 0) {
		configs.push({
			ignores: [
				'**/node_modules/**',
				'**/dist/**',
				'**/build/**',
				'**/.next/**',
				'**/coverage/**',
				...ignores,
			],
		});
	} else {
		configs.push({
			ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**', '**/coverage/**'],
		});
	}

	// Base config (always included)
	configs.push(...createBaseConfig(options));

	// Type-specific configs
	switch (type) {
		case 'react':
			configs.push(...createReactConfig(options));
			break;
		case 'backend':
			configs.push(...createBackendConfig());
			break;
		case 'library':
			// Library uses base config only
			break;
	}

	return configs;
}

// Default export for convenience
export default instant;
