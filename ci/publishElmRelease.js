const execSync = require('child_process').execSync;

/**
 A semantic release "publish" plugin to trigger `elm-package publish` after tags are created.
 */
async function tagElmRelease(config, context) {
  function exec(command) {
    context.logger.log(`Running: ${command}`);
    execSync(command);
  }

  const newVersion = context.nextRelease.version;
  exec(`elm-package publish`);
}

module.exports = tagElmRelease;
