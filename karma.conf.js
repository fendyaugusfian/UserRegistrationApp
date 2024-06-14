// karma.conf.js
const path = require('path');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      // Update the path to your test file
      'test/unit/UserForm.spec.js'
    ],
    preprocessors: {
      'test/unit/*.spec.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-modules-commonjs'],
        sourceMap: 'inline'
        // add any other Babel options if needed
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },
    reporters: ['progress'],
    browsers: ['Chrome'],
    singleRun: true,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-babel-preprocessor')
    ],
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    }
  });
};
