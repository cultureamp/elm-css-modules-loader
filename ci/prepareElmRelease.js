const fs = require('fs');
const process = require('process');

/**
 A semantic release "prepare" plugin to update elm-package.json
 */
async function prepareElmRelease(config, context) {
  function exec(command) {
    context.logger.log(`Running: ${command}`);
    execSync(command);
  }

  execCommand(`yarn elm-package diff`);
  execCommand(`yarn elm-package bump`);
}

module.exports = prepareElmRelease;
