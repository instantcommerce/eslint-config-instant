const path = require('path')

module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true,
    node: true,
  },

  extends: [
    path.join(__dirname, 'index.js'),
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],

  parser: '@typescript-eslint/parser',
  plugins: ['import', 'prettier'],

  parserOptions: {
    ecmaVersion: 2017,
    project: './tsconfig.json',
    sourceType: 'module',
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
        'svg': 'always'
      }
    ],

    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': true,
        'optionalDependencies': false,
        'peerDependencies': false
      }
    ],

    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'no-console': 0,


    'prettier/prettier': [
      'error',
      {
        'printWidth': 120,
        'semi': true,
        'singleQuote': true,
        'tabWidth': 2,
        'trailingComma': 'none',
        'arrowParens': 'avoid',
        'useTabs': false
      }
    ]
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      alias: {
        map: [
          ['@common', './src/common'],
          ['@module', './src/modules'],
          ['@util', './src/util']
        ],
        extensions: ['.js', '.ts']
      },
      node: {
        extensions: [".js", ".ts"]
      }
    },
  },
};
