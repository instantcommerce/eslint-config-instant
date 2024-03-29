module.exports = {
	extends: ['prettier'],
	plugins: ['@typescript-eslint', 'import', 'prettier'],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts'],
			},
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
	},
	rules: {
		// come up with some nice rules here

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
						pattern: '~**',
						group: 'internal',
						position: 'before',
					},
					{
						pattern: '~**/**',
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
				printWidth: 100,
				semi: true,
				singleQuote: true,
				tabWidth: 2,
				trailingComma: 'all',
				useTabs: true,
			},
		],
	},
};
