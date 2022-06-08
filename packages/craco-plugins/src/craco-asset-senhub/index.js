const path = require('path')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  webpackConfig.module.rules.push({
    test: /static.app.(js|mjs|jsx|ts|tsx)$/,
    use: [
      {
        loader: path.resolve(__dirname, './asset-senhub-loader.js'),
        options: pluginOptions || {},
      },
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-modules-commonjs',
            [
              require.resolve('babel-plugin-module-resolver'),
              {
                root: webpackConfig.resolve.modules,
              },
            ],
          ],
        },
      },
    ],
  })
  return webpackConfig
}

module.exports = { overrideWebpackConfig }
