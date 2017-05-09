const loaderUtils = require('loader-utils');
const babel = require('babel-core');
const { default: generate } = require('babel-generator');

const loader = function(source, inputSourceMap) {
  this.cacheable && this.cacheable();

  const config = loaderUtils.getOptions(this) || {};

  // TODO get config from Webpack (hard-coded for now)
  config.module = 'CssModules';
  config.tagger = 'CssModule';

  const packageName = 'user/project';
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
    cssModulesTransformer(loaderContext, transformerOptions),
  ];

  const { code, map } = babel.transform(source, babelOptions);

  if (map && (!map.sourcesContent || !map.sourcesContent.length)) {
    map.sourcesContent = [source];
  }

  return { code, map };
}

function cssModulesTransformer(loaderContext, options) {
  return function plugin({ types: t }) {
    return {
      visitor: {
        CallExpression: callExpressionVisitor(t, loaderContext, options),
      },
    };
  };
}

const REPLACED_NODE = Symbol('elmCssModulesLoaderReplaced');

function callExpressionVisitor(t, loaderContext, options) {
  return function visitor(path) {
    // avoid infinite recursion
    if (path.node[REPLACED_NODE]) {
      return;
    }

    // look for:
    //
    //     A2(<taggerName>, ...);
    if (
      !(t.isIdentifier(path.node.callee) &&
        path.node.callee.name === 'A2' &&
        t.isIdentifier(path.node.arguments[0]) &&
        path.node.arguments[0].name === options.taggerName)
    )
      return;

    // replace hard-coded CSS classes with require("stylesheet.css")
    const replacement = t.callExpression(
      path.node.callee, // A2 (leave alone)
      [
        path.node.arguments[0], // taggerName (leave alone)
        path.node.arguments[1], // e.g. "stylesheet.css" (leave alone)
        t.callExpression(t.Identifier('require'), [path.node.arguments[1]]),
      ]
    );
    replacement[REPLACED_NODE] = true;

    path.replaceWith(replacement);
  };
}

module.exports = loader;
