const path = require('path');

module.exports = [
  {
    mode: 'development',
    devtool: 'source-map',
    entry: './dist/index.js',
    output: {
      filename: 'index.mjs',
      path: path.resolve(__dirname, 'dist/esm'),
      library: { type: 'module' }
    },
    experiments: { outputModule: true }
  }, {
    mode: 'development',
    devtool: 'source-map',
    entry: './dist/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/js'),
      library: {
        name: 'simpleCookie',
        type: 'var'
      }
    }
  }, {
    mode: 'development',
    devtool: 'source-map',
    entry: './dist/js-util.js',
    output: {
      filename: 'js-util.mjs',
      path: path.resolve(__dirname, 'dist/esm'),
      library: { type: 'module' }
    },
    experiments: { outputModule: true }
  }, {
    mode: 'production',
    entry: './dist/index.js',
    output: {
      filename: 'index.min.mjs',
      path: path.resolve(__dirname, 'dist/esm'),
      library: { type: 'module' }
    },
    experiments: { outputModule: true }
  }, {
    mode: 'production',
    entry: './dist/index.js',
    output: {
      filename: 'index.min.js',
      path: path.resolve(__dirname, 'dist/js'),
      library: {
        name: 'simpleCookie',
        type: 'var'
      }
    }
  }, {
    mode: 'production',
    entry: './dist/js-util.js',
    output: {
      filename: 'js-util.min.mjs',
      path: path.resolve(__dirname, 'dist/esm'),
      library: { type: 'module' }
    },
    experiments: { outputModule: true }
  }
];