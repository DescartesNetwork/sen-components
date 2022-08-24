/**
 * Credit https://github.com/hasanayan/craco-module-federation
 */
const path = require('path')
const { expand } = require('dotenv-expand')
const {
  overrideWebpackConfig: originOverrideWebpackConfig,
  overrideDevServerConfig,
} = require('craco-module-federation')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  webpackConfig = originOverrideWebpackConfig({
    context,
    webpackConfig,
    pluginOptions: {
      useNamedChunkIds: true,
      ...pluginOptions,
    },
  })
  // Avoid remote collision
  // https://webpack.js.org/concepts/module-federation/#collision-between-modules-from-different-remotes
  webpackConfig.output.uniqueName = pluginOptions.uniqueName

  // React Refresh
  // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/394#issuecomment-877708732
  // The bug is examined by people, please follow the link for updates

  return webpackConfig
}

module.exports = {
  overrideWebpackConfig,
  overrideDevServerConfig,
  enableHMR: (opts = {}) => {
    const pathSep = path.sep
    const rootDir = process.env.PWD
    const env = process.env.NODE_ENV
    const { bootstrapAppPath, enabledEnvs } = {
      bootstrapAppPath: `${pathSep}src${pathSep}bootstrap.app.tsx`,
      enabledEnvs: ['development'],
      ...opts,
    }
    if (enabledEnvs.includes(env))
      expand({
        parsed: {
          REACT_APP_HMR: path.join(rootDir, bootstrapAppPath),
        },
      })
    return {
      overrideWebpackConfig,
      overrideDevServerConfig,
    }
  },
}
