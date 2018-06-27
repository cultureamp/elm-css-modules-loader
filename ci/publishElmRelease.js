const fs = require('fs');
const execSync = require('child_process').execSync;
const { tag, push } = require('semantic-release/lib/git');
const getGitAuthUrl = require('semantic-release/lib/get-git-auth-url');

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
  const repositoryUrl = await getGitAuthUrl(config);
  await push(repositoryUrl, config.branch);

  exec(`elm-package publish`);

  return true;
}

module.exports = tagElmRelease;
