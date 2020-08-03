# eslint-config-ams
Shareable eslint config used in projects created by Story of AMS.

## install

Start by removing any .eslintrc or prettierrc files in your project.

Then drop the following line in your terminal

```
  yarn add babel-eslint eslint eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-import eslint-import-resolver-alias eslint-plugin-react-hooks prettier git+https://github.com/storyofams/eslint-config-ams.git --dev
```

Finally add this to your package.json

```
"eslintConfig": {
  "extends": [
    "ams"
  ]
},
```
