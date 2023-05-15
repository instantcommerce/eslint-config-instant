module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	env: {
		node: true,
		es6: true,
		jest: true,
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@module', './src/modules'],
					['@common', './src/common'],
					['@util', './src/util'],
				],
				extensions: ['.js', '.ts'],
			},
			node: {
				extensions: ['.js', '.ts'],
			},
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': ['off'],
		'@typescript-eslint/explicit-member-accessibility': [1],
		'@typescript-eslint/interface-name-prefix': [0, 'never'],
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-namespace': 0,
		'@typescript-eslint/no-inferrable-types': 0,
		'import/extensions': [
			1,
			'never',
			{
				svg: 'always',
			},
		],
		'import/newline-after-import': ['error', { considerComments: true }],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
				optionalDependencies: false,
				peerDependencies: false,
			},
		],
		'no-param-reassign': 0,
		'no-underscore-dangle': 0,
		'no-use-before-define': 0,
		'no-console': ['error', { allow: ['error'] }],
		'padding-line-between-statements': 'off',
		'@typescript-eslint/padding-line-between-statements': [
			'error',
			// blank line before return
			{ blankLine: 'always', prev: '*', next: 'return' },
			// blank line before and after block like statements
			{ blankLine: 'always', prev: '*', next: 'block-like' },
			{ blankLine: 'always', prev: 'block-like', next: '*' },
			// blank line before and after function declarations
			{ blankLine: 'always', prev: '*', next: 'function' },
			{ blankLine: 'always', prev: 'function', next: '*' },
		],
		'spaced-comment': 'error',
		// default case in a switch needs to be last
		'default-case-last': 'error',
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				groups: ['builtin', 'external', ['internal', 'parent'], ['sibling', 'index']],
				pathGroups: [
					{
						pattern: 'react',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '@**',
						group: 'internal',
						position: 'before',
					},
					{
						pattern: '@**/**',
						group: 'internal',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: [],
			},
		],
		'prettier/prettier': [
			'error',
			{
				printWidth: 120,
				semi: true,
				singleQuote: true,
				tabWidth: 2,
				trailingComma: 'all',
				useTabs: true,
				arrowParens: 'avoid',
			},
		],
	},
};
