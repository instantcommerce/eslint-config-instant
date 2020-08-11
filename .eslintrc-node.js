// inspired by eslint-config-react-app and eslint-config-airbnb
const path = require('path')

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [path.join(__dirname, 'index.js'), 'prettier/@typescript-eslint', 'prettier'],
  plugins: ['import', 'prettier'],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  // NOTE: When adding rules here, you need to make sure they are compatible with
  // `typescript-eslint`, as some rules such as `no-array-constructor` aren't compatible.
  rules: {
    // overwrite or add rules here


    "prettier/prettier": [
      "error",
      {
        "printWidth": 120,
        "semi": true,
        "singleQuote": true,
        "tabWidth": 2,
        "trailingComma": "all",
        "useTabs": false
      }
    ]
  },
};
