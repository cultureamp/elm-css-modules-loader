const loaderUtils = require('loader-utils');

function regexpForFunctionCall(fnName, args) {
  const optionalWhitespace = '\\s*';
  const argumentParts = [];
  for (let i = 0; i < args.length; i++) {
    argumentParts.push(optionalWhitespace);
    argumentParts.push(args[i]);
    if (i < args.length - 1) {
      argumentParts.push(',');
    }
    argumentParts.push(optionalWhitespace);
  }
  let parts = [fnName, '\\(', ...argumentParts, '\\)'];
  return new RegExp(parts.join(''), 'g');
}

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
    moduleNameCapture = "'([a-zA-Z-_./]+)'",
    expectedClassRules = "{[a-zA-Z0-9:$, ']*}";

  const regexp = regexpForFunctionCall('A2', [
    escapedTaggerName,
    moduleNameCapture,
    expectedClassRules,
  ]);

  source = source.replace(
    regexp,
    'A2(' + taggerName + ", '$1', require('$1'));"
  );
  return source;
};

module.exports = loader;
