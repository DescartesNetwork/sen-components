const Module = require('module')
const nodeEval = require('node-eval')

const defaultOptions = {
  extensions: ['.png', '.jpeg', '.jpg', '.gif', '.md', '.svg'],
  exports: ['logo', 'panels', 'readme'],
}

module.exports = function (content) {
  const { extensions, exports } = {
    ...defaultOptions,
    ...(this.getOptions() || {}),
  }
  // Convert image to path in the 'require' statement
  extensions.forEach(function (ext) {
    Module._extensions[ext] = function (module, filename) {
      module._compile(`module.exports="${filename}"`, filename)
    }
  })

  const values = nodeEval(content, this.resourcePath)
  const assets = {}
  exports.forEach((key) => (assets[key] = values[key]))
  // For plugins to read the assets
  global.senhubAssets = assets

  return content
}
