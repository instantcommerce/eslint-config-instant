# ⚙️ eslint-config-instant

A shareable eslint config used in projects created by Instant Commerce. The eslint config relies on several eslint plugins and implements prettier as a rule set.

## Installation

Start by removing any .eslintrc or .prettierrc files in your project. (**Note that eslintignore and prettierignore are still needed per project**)

Once done, drop the following line in your favorite terminal:

For frontend:
```bash
yarn add -D eslint-config-instant eslint eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-import eslint-import-resolver-alias eslint-plugin-react-hooks eslint-plugin-mdx prettier
```

For backend:
```bash
yarn add -D eslint-config-instant eslint eslint-config-prettier eslint-import-resolver-alias eslint-plugin-import eslint-plugin-prettier
```

Finally add this to your package.json
Various available packages are:

- instant
For libraries/packages/etc where /react or /backend is overkill

```js
"eslintConfig": {
  "extends": [
    "instant"
  ]
},
```

- instant/react
For all things frontend

```js
"eslintConfig": {
  "extends": [
    "instant/react"
  ]
},
```

- instant/backend
For all things backend

```js
"eslintConfig": {
  "extends": [
    "instant/backend"
  ]
},
```

## formatOnSave With VS Code

Once you have installed the eslint-config, you probably want your editor to lint and fix for you.
Here are the instructions for VS Code:

1. Install the [ESLint package](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Now we need to setup some VS Code settings via `Code/File` → `Preferences` → `Settings`. It's easier to enter these settings while editing the `settings.json` file, so click the `{}` icon in the top right corner:

```js
// These are all my auto-save configs
"editor.formatOnSave": true,
// turn it off for JS and JSX, we will do this via eslint
"[javascript]": {
"editor.formatOnSave": false
},
"[javascriptreact]": {
"editor.formatOnSave": false
},
// tell the ESLint plugin to run on save
"editor.codeActionsOnSave": {
"source.fixAll": true
},
// Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
"prettier.disableLanguages": ["javascript", "javascriptreact"],
```
