const cypress = require('eslint-plugin-cypress');
const chaiFriendly = require('eslint-plugin-chai-friendly');
const prettier = require('eslint-plugin-prettier');
const _import = require('eslint-plugin-import');

const { fixupPluginRules } = require('@eslint/compat');

const globals = require('globals');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = [
  {
    ignores: ['**/*.json', '**/pnpm-lock.yaml', '**/*.md', '**/.eslintignore', '**/*.feature']
  },
  ...compat.extends('plugin:cypress/recommended', 'plugin:chai-friendly/recommended'),
  {
    plugins: {
      cypress,
      'chai-friendly': chaiFriendly,
      prettier,
      import: fixupPluginRules(_import)
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...cypress.environments.globals.globals
      }
    },

    rules: {
      'no-unused-expressions': 'error',
      'chai-friendly/no-unused-expressions': 2,
      'sort-keys': 'off',

      indent: [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],

      'no-duplicate-imports': [
        'error',
        {
          includeExports: true
        }
      ],

      'comma-dangle': ['error', 'never'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': 'off',

      'max-len': [
        'warn',
        {
          code: 150,
          tabWidth: 2
        }
      ],

      'cypress/no-unnecessary-waiting': 'off',
      'cypress/no-pause': 'error',
      'prettier/prettier': ['error']
    }
  }
];
