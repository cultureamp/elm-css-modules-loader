const execSync = require('child_process').execSync;

/**
 A semantic release "prepare" plugin to update elm-package.json
 */
async function prepareElmRelease(config, context) {
  function exec(command) {
    context.logger.log(`Running: ${command}`);
    execSync(command, { shell: '/bin/bash' });
  }

  exec(`yarn elm-package diff`);
  exec(`yes | yarn elm-package bump`);
}

module.exports = prepareElmRelease;
