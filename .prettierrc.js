import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);
const { basePrettierOptions } = jiti('./src/prettier.ts');

export default basePrettierOptions;
