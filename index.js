const loaderUtils = require('loader-utils');
const babel = require('@babel/core');
const elmCssModulesPlugin = require('elm-css-modules-plugin');

const loader = function(source, inputSourceMap) {
  this.cacheable && this.cacheable(); // for Webpack 1.x compatibility

  const config = loaderUtils.getOptions(this) || {};

  config.module = config['module'] || 'CssModules';
  config.tagger = config['tagger'] || 'css';

  const packageName = config['package'] || 'cultureamp/elm-css-modules-loader';
  const taggerName =
    '_' +
    [
      packageName.replace(/-/g, '_').replace(/\//g, '$'),
      config.module.replace(/\./g, '_'),
      config.tagger,
    ].join('$');

  const transformerOptions = {
    taggerName: taggerName,
    localPath: config.localPath,
  };

  const webpackRemainingChain = loaderUtils
    .getRemainingRequest(this)
    .split('!');
  const filename = webpackRemainingChain[webpackRemainingChain.length - 1];
  const babelOptions = {
    inputSourceMap: inputSourceMap,
    sourceRoot: process.cwd(),
    filename: filename,
    compact: false,
    babelrc: false,
  };

  const result = transform(source, this, transformerOptions, babelOptions);

  this.callback(null, result.code, result.map);
};

function transform(source, loaderContext, transformerOptions, babelOptions) {
  babelOptions.plugins = [
    elmCssModulesPlugin.withOptions({
      taggerName: transformerOptions.taggerName,
    }),
  ];

  const { code, map } = babel.transform(source, babelOptions);

  if (map && (!map.sourcesContent || !map.sourcesContent.length)) {
    map.sourcesContent = [source];
  }

  return { code, map };
}

module.exports = loader;
