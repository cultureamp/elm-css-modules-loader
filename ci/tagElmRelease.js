const execSync = require('child_process').execSync;

/**
 A semantic release "publish" plugin to create git tags and publish using elm-package
 */
async function tagElmRelease(config, context) {
  function exec(command) {
    context.logger.log(`Running: ${command}`);
    execSync(command);
  }

  const newVersion = context.nextRelease.version;
  exec(`git tag -a ${newVersion} -m "elm-package release ${newVersion}"`);
  exec(`git push --tags`);
  exec(`elm-package publish`);
}

module.exports = tagElmRelease;
