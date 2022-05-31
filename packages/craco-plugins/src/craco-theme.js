/**
 * Postcss Prefix Selector
 * https://www.npmjs.com/package/postcss-prefix-selector
 * Theme changing by CSS selector
 * https://gist.github.com/sbusch/a90eafaf5a5b61c6d6172da6ff76ddaa
 */
const { getLoaders, loaderByName } = require('@craco/craco')
const prefixer = require('postcss-prefix-selector')

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  // Cannot use prebuilt options in craco, so we have to add it manually
  // https://stackoverflow.com/questions/68738215/craco-plugin-not-loading
  const { theme, uniqueName } = pluginOptions
  const uniqueSelector = uniqueName ? '#' + uniqueName : ''
  const themeSelectors = theme.map((e) => '#' + e.trim())
  const prefixed = themeSelectors.map((e) => new RegExp(`^${e} `, 'i'))
  const styleExt = '.(css|less|sass|scss)$'
  const osExt = '.os'
  const nodeModules = 'node_modules'

  const { hasFoundAny, matches } = getLoaders(
    webpackConfig,
    loaderByName('postcss-loader'),
  )
  if (!hasFoundAny) return webpackConfig
  const osThemePrefixer = theme.map((mode) =>
    prefixer({
      prefix: `#${mode}`,
      exclude: ['html', ...prefixed],
      includeFiles: [new RegExp(mode + osExt + styleExt, 'i')],
      transform: (prefix, selector, prefixedSelector) => {
        if (selector === 'body') return selector + prefix
        else return prefixedSelector
      },
    }),
  )
  const appThemePrefixer = theme.map((mode) =>
    prefixer({
      prefix: `#${mode}`,
      exclude: ['html', ...prefixed],
      includeFiles: [new RegExp(mode + styleExt, 'i')],
      transform: (prefix, selector, prefixedSelector) => {
        if (selector === 'body') return selector + prefix
        else return prefixedSelector
      },
    }),
  )
  const appIdPrefixer = prefixer({
    prefix: uniqueSelector,
    exclude: ['html', 'body'],
    includeFiles: [new RegExp(styleExt, 'i')],
    ignoreFiles: [
      new RegExp(osExt + styleExt, 'i'),
      new RegExp(nodeModules, 'i'),
    ],
    transform: (prefix, selector, prefixedSelector) => {
      prefixedSelector = selector
      themeSelectors.forEach((e) => {
        prefixedSelector = prefixedSelector.replace(e, `${e} ${uniqueSelector}`)
      })
      if (!prefixedSelector.includes(uniqueSelector))
        prefixedSelector = `${uniqueSelector} ${prefixedSelector}`
      return prefixedSelector
    },
  })
  matches.forEach((match) => {
    match.loader.options.postcssOptions.plugins.push(
      ...osThemePrefixer,
      ...appThemePrefixer,
      appIdPrefixer,
    )
  })
  return webpackConfig
}

module.exports = { overrideWebpackConfig }
