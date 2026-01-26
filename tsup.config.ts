import { defineConfig } from 'tsup';

export default defineConfig([
	{
		entry: [
			'src/index.ts',
			'src/configs/base.ts',
			'src/configs/react.ts',
			'src/configs/backend.ts',
			'src/prettier.ts',
		],
		format: ['esm'],
		dts: true,
		clean: true,
		outDir: 'dist',
		splitting: false,
		sourcemap: true,
	},
	{
		entry: ['src/cli.ts'],
		format: ['esm'],
		dts: false,
		outDir: 'dist',
		banner: {
			js: '#!/usr/bin/env node',
		},
	},
]);
