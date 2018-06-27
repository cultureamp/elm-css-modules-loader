const execSync = require('child_process').execSync;
const { tag, push } = require('semantic-release/lib/git');

/**
 A semantic release "publish" plugin to create tags and run `elm-package publish`.
 */
async function tagElmRelease(config, context) {
  function exec(command) {
    context.logger.log(`Running: ${command}`);
    execSync(command);
  }

  const elmPackageJson = JSON.parse(fs.readFileSync('elm-package.json'));
  await tag(elmPackageJson.version);

  const packageJson = JSON.parse(fs.readFileSync('package.json'));
  await push(packageJson.repository, config.branch);

  exec(`elm-package publish`);

  return true;
}

module.exports = tagElmRelease;
