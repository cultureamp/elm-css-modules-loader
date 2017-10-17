const loaderUtils = require('loader-utils');

const loader = function(source, inputSourceMap) {
  if (this.cacheable) this.cacheable();

  const config = loaderUtils.getOptions(this) || {};
  const packageName = config.package || 'cultureamp/elm-css-modules-loader';
  config.module = config.module || 'CssModules';
  config.tagger = config.tagger || 'css';

  const taggerName =
      '_' +
      [
        packageName.replace(/-/g, '_').replace(/\//g, '$'),
        config.module.replace(/\./g, '_'),
        config.tagger,
      ].join('$'),
    escapedTaggerName = taggerName.replace(/\$/g, '\\$'),
    a2 = 'A2',
    optionalWhitespace = '\\s*',
    moduleNameCapture = '([a-z-./]+)',
    expectedClassRules = "{[a-z0-9:, ']*}";

  const regexp = new RegExp(
    [
      'A2\\(',
      optionalWhitespace,
      escapedTaggerName,
      ',',
      optionalWhitespace,
      "'",
      moduleNameCapture,
      "',",
      optionalWhitespace,
      expectedClassRules,
      optionalWhitespace,
      '\\);',
    ].join(''),
    'gi'
  );

  const transformedSource = source.replace(
    regexp,
    'A2(' + taggerName + ", '$1', require('$1'));"
  );
  return transformedSource;
};

module.exports = loader;
