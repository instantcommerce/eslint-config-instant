/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';

import prompts from 'prompts';

interface InitOptions {
  type: 'react' | 'backend' | 'library';
  typescript: boolean;
  aliases: boolean;
  aliasConfig: Record<string, string>;
  features: {
    a11y: boolean;
  };
}

const CONFIG_FILENAME_TS = 'eslint.config.ts';
const CONFIG_FILENAME_JS = 'eslint.config.js';

async function init() {
  console.log('\n⚙️  eslint-config-instant setup\n');

  const existingConfig = [CONFIG_FILENAME_TS, CONFIG_FILENAME_JS, '.eslintrc', '.eslintrc.js', '.eslintrc.json'].find(
    (f) => fs.existsSync(path.join(process.cwd(), f)),
  );

  if (existingConfig) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Found existing ${existingConfig}. Do you want to overwrite it?`,
      initial: false,
    });

    if (!overwrite) {
      console.log('Aborted.');
      process.exit(0);
    }
  }

  const answers = await prompts([
    {
      type: 'select',
      name: 'type',
      message: 'What type of project is this?',
      choices: [
        { title: 'React / Next.js / Remix', value: 'react' },
        { title: 'Node.js Backend', value: 'backend' },
        { title: 'Library / Package', value: 'library' },
      ],
      initial: 0,
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Are you using TypeScript?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'aliases',
      message: 'Do you have custom import aliases (e.g., ~components, @lib)?',
      initial: false,
    },
    {
      type: (prev) => (prev ? 'text' : null),
      name: 'aliasInput',
      message: 'Enter aliases as key=path pairs, comma-separated (e.g., ~components=./src/components,~hooks=./src/hooks):',
    },
    {
      type: (_, values) => (values.type === 'react' ? 'confirm' : null),
      name: 'a11y',
      message: 'Enable accessibility (a11y) rules?',
      initial: true,
    },
  ]);

  if (!answers.type) {
    console.log('Aborted.');
    process.exit(0);
  }

  const options: InitOptions = {
    type: answers.type,
    typescript: answers.typescript,
    aliases: answers.aliases,
    aliasConfig: {},
    features: {
      a11y: answers.a11y ?? true,
    },
  };

  if (answers.aliasInput) {
    const pairs = answers.aliasInput.split(',').map((p: string) => p.trim());
    for (const pair of pairs) {
      const [key, value] = pair.split('=').map((s: string) => s.trim());
      if (key && value) {
        options.aliasConfig[key] = value;
      }
    }
  }

  const configContent = generateConfig(options);
  const filename = options.typescript ? CONFIG_FILENAME_TS : CONFIG_FILENAME_JS;

  fs.writeFileSync(path.join(process.cwd(), filename), configContent);

  console.log(`\n✅ Created ${filename}`);
  console.log('\nNext steps:');
  console.log('  1. Run your linter: npm run lint');
  console.log('  2. Fix issues: npm run lint -- --fix');

  if (!fs.existsSync(path.join(process.cwd(), 'node_modules', 'eslint-config-instant'))) {
    console.log('\n⚠️  Don\'t forget to install dependencies:');
    console.log('  npm install -D eslint-config-instant eslint');
    if (options.typescript) {
      console.log('  npm install -D typescript');
    }
  }

  console.log('');
}

function generateConfig(options: InitOptions): string {
  const { type, aliases, aliasConfig, features } = options;

  const lines: string[] = [];

  lines.push(`import { instant } from 'eslint-config-instant';`);
  lines.push('');
  lines.push('export default instant({');
  lines.push(`  type: '${type}',`);

  if (aliases && Object.keys(aliasConfig).length > 0) {
    lines.push('  aliases: {');
    for (const [key, value] of Object.entries(aliasConfig)) {
      lines.push(`    '${key}': '${value}',`);
    }
    lines.push('  },');
  }

  if (type === 'react' && features.a11y === false) {
    lines.push('  features: {');
    lines.push('    a11y: false,');
    lines.push('  },');
  }

  lines.push('});');
  lines.push('');

  return lines.join('\n');
}

function showHelp() {
  console.log(`
⚙️  eslint-config-instant CLI

Usage:
  npx eslint-config-instant init    Interactive setup wizard
  npx eslint-config-instant --help  Show this help message

Examples:
  npx eslint-config-instant init
  
  # Or after installing:
  npm exec eslint-config-instant init
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'init':
      await init();
      break;
    case '--help':
    case '-h':
    case 'help':
      showHelp();
      break;
    default:
      if (command) {
        console.error(`Unknown command: ${command}`);
      }
      showHelp();
      process.exit(command ? 1 : 0);
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
