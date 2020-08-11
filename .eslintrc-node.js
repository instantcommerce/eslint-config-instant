const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    path.join(__dirname, 'index.js'), 'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],

  plugins: ['import', 'prettier'],

  env: {
    browser: false,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    project: './tsconfig.json',
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@module', './src/modules'],
          ['@common', './src/common'],
          ['@util', './src/util']
        ],
        extensions: ['.js', '.ts']
      },
      node: {
        extensions: [".js", ".ts"]
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    }
  },

  rules: {
    // overwrite or add rules here
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
};
