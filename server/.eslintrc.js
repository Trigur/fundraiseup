const webpackConfig = require('./webpack.config');

module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  rules: {
    'class-methods-use-this': 0,
    'prefer-template': 0,
    'no-plusplus': 0,
    'no-unused-vars': 1,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-body-style': ['error', 'as-needed']
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: webpackConfig,
    }
  }
};
