const path = require('path')

const defaultOptions = {
  outputFile: 'asset-senhub',
  extensions: ['.png', '.jpeg', '.jpg', '.gif', '.md', '.svg'],
  exports: ['logo', 'panels', 'readme'],
}

// const tests = new RegExp()

const overrideWebpackConfig = ({
  context,
  webpackConfig,
  pluginOptions = {},
}) => {
  webpackConfig.module.rules.push({
    test: /static\.app\.(js|mjs|jsx|ts|tsx)$/,
    use: [
      {
        loader: path.resolve(__dirname, './asset-senhub-loader.js'),
        options: { ...defaultOptions, ...pluginOptions },
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
