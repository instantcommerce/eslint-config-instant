import { instant } from './src/index.js';

export default instant({
  type: 'library',
  ignores: [
    'dist/**',
    'coverage/**',
    // Legacy CommonJS config files
    '.commitlintrc.js',
    '.cz-config.js',
  ],
});
