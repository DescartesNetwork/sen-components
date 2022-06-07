const path = require('path')

function test(declared, original, transformed) {
  if (typeof original === 'string') {
    if (new RegExp(`${declared}$`, 'i').test(original)) {
      return transformed
    } else {
      return original
    }
  }
  if (Array.isArray(original)) {
    let temp = [...original]
    temp.forEach(function (original, i) {
      temp[i] = test(declared, original, transformed)
    })
    return temp
  }
  throw new Error(
    `The assets with type of ${typeof original} is not supported!`,
  )
}

class FileListPlugin {
  static defaultOutputFile = 'asset-senhub'

  constructor(outputFile = FileListPlugin.defaultOutputFile) {
    this.output = outputFile + '.json'
  }

  apply(compiler) {
    const pluginName = FileListPlugin.name
    const {
      webpack: {
        sources: { RawSource },
      },
    } = compiler

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(pluginName, () => {
        const stats = compilation.getStats().toJson({
          all: false,
          assets: true,
          cachedAssets: true,
          // Note: Webpack v5 compat
          ids: true,
          publicPath: true,
        })
        let assets = { ...(global.senhubAssets || {}) }
        stats.assets.forEach(function ({ name, info: { sourceFilename } }) {
          if (!sourceFilename) return
          Object.keys(assets).forEach(function (key) {
            const transformed = test(sourceFilename, assets[key], name)
            assets[key] = transformed
          })
        })
        compilation.emitAsset(
          this.output,
          new RawSource(JSON.stringify(assets)),
        )
      })
    })
  }
}

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  const { outputFile, ...options } = pluginOptions || {}
  webpackConfig.plugins.push(new FileListPlugin(outputFile))

  webpackConfig.module.rules.push({
    test: /static.app.(js|mjs|jsx|ts|tsx)$/,
    use: [
      {
        loader: path.resolve(__dirname, './asset-senhub-loader.js'),
        options,
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
