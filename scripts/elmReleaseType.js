/**
 Print whether the change is 'major', 'minor' or 'patch' as defined by `elm-package diff`.

 Usage: `node scripts/elmReleaseType.js`.
 */
const execSync = require('child_process').execSync;
const diff = execSync(`elm-package diff`).toString();
const searchPattern = /This is a (MAJOR|MINOR|PATCH) change./;
const searchResult = searchPattern.exec(diff);
if (searchResult) {
  const changeType = searchResult[1].toLowerCase();
  console.log(changeType);
}
