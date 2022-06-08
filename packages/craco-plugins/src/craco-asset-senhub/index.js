const fs = require('fs')
const path = require('path')
const { hash } = require('./utils')

const test = (asset, filename) => {
  if (typeof filename === 'string') {
    if (!fs.existsSync(filename)) return filename
    const sourceHash = hash(asset.source.source())
    const targetHash = hash(fs.readFileSync(filename))
    const sourceFilename = asset.info?.sourceFilename
    let ok = true
    ok = ok && sourceHash === targetHash
    if (sourceFilename)
      ok = ok && new RegExp(`${sourceFilename}$`, 'i').test(filename)
    if (ok) return asset.name
    else return filename
  }
  if (Array.isArray(filename)) {
    let temp = [...filename]
    temp.forEach((filename, i) => (temp[i] = test(asset, filename)))
    return temp
  }
  throw new Error(
    `The assets with type of ${typeof filename} is not supported!`,
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
        const assets = { ...(global.senhubAssets || {}) }
        Object.keys(assets).forEach((key) => {
          compilation.getAssets().forEach((asset) => {
            assets[key] = test(asset, assets[key])
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
