/**
 Create a git tag for the current release and publish with elm-package.

 Usually semantic-release will create a tag in the format `v1.0.0`, but Elm expects tags to be in the format `1.0.0`.
 This script will create an additional tag for Elm to reference.

 Usage: `node scripts/tagElmRelease.js NEW_VERSION_NUMBER`.
 */
const execSync = require('child_process').execSync;
const process = require('process');

// The first 2 arguments are the NodeJS process and the script name.
const newVersion = process.argv[2];
execSync(`git tag -a ${newVersion} -m "elm-package release ${newVersion}"`);
execSync(`git push --tags`);
execSync(`elm-package publish`);
