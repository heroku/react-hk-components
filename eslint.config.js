const js = require('@eslint/js')
const typescript = require('@typescript-eslint/eslint-plugin')
const typescriptParser = require('@typescript-eslint/parser')
const react = require('eslint-plugin-react')
const importPlugin = require('eslint-plugin-import')
const prettier = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')

module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        browser: true,
        node: true,
        es6: true,
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      import: importPlugin,
      prettier,
    },
    rules: {
      // Basic rules
      'import/first': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      
      // React rules
      'react/jsx-handler-names': 'error',
      'react/jsx-key': 'error',
      'react/jsx-wrap-multilines': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/sort-comp': 'warn',
      'react/sort-prop-types': 'warn',
      'react/prop-types': 'off',
      'react/display-name': 'warn',
      'react/no-array-index-key': 'warn',
      'react/no-unescaped-entities': 'error',
      'react/self-closing-comp': 'warn',
      
      // Prettier
      'prettier/prettier': 'warn',
    },
    settings: {
      react: {
        version: '18.2.0',
      },
    },
  },
  prettierConfig,
]
