const fs = require('fs');
const process = require('process');

/**
 A semantic release "prepare" plugin to update elm-package.json
 */
async function prepareElmRelease(config, context) {
  const newVersion = context.nextRelease.version;
  context.logger.log(
    `Updating elm-package.json version number to ${newVersion}`
  );
  const elmPackageJson = JSON.parse(fs.readFileSync('elm-package.json'));
  elmPackageJson.version = newVersion;
  fs.writeFileSync('elm-package.json', JSON.stringify(elmPackageJson, null, 2));
}

module.exports = prepareElmRelease;
