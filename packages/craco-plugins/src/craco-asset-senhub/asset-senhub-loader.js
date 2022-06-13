const fs = require('fs')
const path = require('path')
const Module = require('module')
const nodeEval = require('node-eval')
const { hash } = require('./utils')

const pathSep = path.sep

const buildManifest = (exports, values) => {
  const assets = {}
  const transformedAssets = {}
  const transform = (value) => {
    if (typeof value === 'string') return buildName(value)
    if (Array.isArray(value))
      return value.map((filename) => transform(filename))
    throw new Error(`The assets with type of ${typeof value} is not supported!`)
  }
  exports.forEach((key) => {
    assets[key] = values[key]
    transformedAssets[key] = transform(values[key])
  })
  return { assets, transformedAssets }
}

const buildName = (filepath) => {
  const filename = filepath.split(pathSep)[filepath.split(pathSep).length - 1]
  const name = filename.split('.')
  const ext = name.pop()
  const buf = fs.readFileSync(filepath)
  name.push(hash(buf).substring(0, 16))
  name.push(ext)
  return 'static/asset/' + name.join('.')
}

module.exports = function (content) {
  const { outputFile, extensions, exports } = this.getOptions()

  // Convert image to path in the 'require' statement
  extensions.forEach((ext) => {
    Module._extensions[ext] = (module, filename) => {
      module._compile(`module.exports="${filename}"`, filename)
    }
  })

  const values = nodeEval(content, this.resourcePath)
  const { assets, transformedAssets } = buildManifest(exports, values)
  Object.values(assets)
    .flat()
    .forEach((filepath) => {
      this.addDependency(filepath)
      const buf = fs.readFileSync(filepath)
      let filename = buildName(filepath)
      this.emitFile(filename, buf)
    })
  this.emitFile(outputFile + '.json', JSON.stringify(transformedAssets))

  return content
}
