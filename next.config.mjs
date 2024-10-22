import path from 'path'
import loaderUtils from 'loader-utils'

/**
 * Stolen from https://stackoverflow.com/questions/10776600/testing-for-equality-of-regular-expressions
 */
const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  )
}

const hashOnlyIdent = (context, _, exportName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, '/')}#className:${exportName}`
      ),
      'md4',
      'base64',
      6
    )
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/^(-?\d|--)/, '_$1')

// Overrides for css-loader plugin
function cssLoaderOptions(modules, dev) {
  // const { getLocalIdent, ...others } = modules // Need to delete getLocalIdent else localIdentName doesn't work
  const _ = {
    ...modules,
    exportLocalsConvention: 'camelCaseOnly',
    mode: 'local'
  }
  if (!dev) {
    _.getLocalIdent = hashOnlyIdent
  }
  return _
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const oneOfMany = config.module.rules.filter(
      (rule) => typeof rule.oneOf === 'object'
    )

    oneOfMany.forEach((oneOf) => {
      // Find the module which targets *.scss|*.sass files
      const moduleSassRuleOfMany = oneOf.oneOf.filter((rule) =>
        regexEqual(rule.test, /\.module\.(scss|sass)$/)
      )

      moduleSassRuleOfMany.forEach((moduleSassRule) => {
        // Get the config object for css-loader plugin
        const cssLoaderOfMany = moduleSassRule.use.filter(({ loader }) =>
          loader?.includes('loaders/css-loader')
        )
        cssLoaderOfMany.forEach((cssLoader) => {
          cssLoader.options = {
            ...cssLoader.options,
            modules: cssLoaderOptions(cssLoader.options.modules, options.dev)
          }
        })
      })
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  async redirects() {
    // rd redirect added for now
    return [
      {
        source: '/rd',
        destination: '/',
        permanent: false
      }
    ]
  }
}

export default nextConfig
