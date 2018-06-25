const execSync = require('child_process').execSync;
const process = require('process');

/**
 A semantic release verifyRelease plugin that will
 Print whether the change is 'major', 'minor' or 'patch' as defined by `elm-package diff`.

 Usage: `node scripts/elmReleaseType.js`.
 */
async function verifyElmReleaseType(config, context) {
  const elmDiffType = getElmDiffType();
  const commitMsgDiffType = context.nextRelease.type;

  if (diffIsGreaterThanExpected(elmDiffType, commitMsgDiffType)) {
    context.logger.error(
      `Elm reported a "${elmDiffType}" change, but the commit message reported only a "${commitMsgDiffType}" change`
    );
    context.logger.error('Please run:');
    context.logger.error(
      `  git commit --allow-empty --message "chore(elm): Breaking \n\n BREAKING: elm-package reports breaking changes"`
    );
    return new Error('Please note elm breaking changes in your commit message');
  }
}

function getElmDiffType() {
  const diff = execSync(`elm-package diff`).toString();
  const searchPattern = /This is a (MAJOR|MINOR|PATCH) change./;
  const searchResult = searchPattern.exec(diff);
  if (searchResult) {
    return searchResult[1].toLowerCase();
  }
}

function diffIsGreaterThanExpected(actual, expected) {
  if (actual === 'major' && expected !== 'major') {
    return true;
  }
  if (actual === 'minor' && expected !== 'major' && expected !== 'minor') {
    return true;
  }
  if (
    actual === 'patch' &&
    expected !== 'major' &&
    expected !== 'minor' &&
    expected !== 'patch'
  ) {
    return true;
  }
  return false;
}

module.exports = verifyElmReleaseType;
