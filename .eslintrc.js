module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:react/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          // As per new structure
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@core', './src/components/core'],
          ['@part', './src/components/part'],
          ['@templates', './src/components/templates'],
          ['@config', './src/config'],
          ['@contexts', './src/contexts'],
          ['@services', './src/services'],
          ['@pages', './src/pages'],
          ['@styles', './src/styles'],
          ['@theme', './src/theme'],
          ['@utils', './src/utils'],
          ['@', './src/'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
