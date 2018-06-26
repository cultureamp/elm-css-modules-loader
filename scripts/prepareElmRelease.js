/**
 Prepare a new Elm release by updating elm-package.json.

 Usage: `node scripts/prepareElmRelease.js NEW_VERSION_NUMBER`.
 */
const fs = require('fs');
const process = require('process');

// The first 2 arguments are the NodeJS process and the script name.
const newVersion = process.argv[2];
const elmPackageJson = JSON.parse(fs.readFileSync('elm-package.json'));
elmPackageJson.version = newVersion;
fs.writeFileSync('elm-package.json', JSON.stringify(elmPackageJson, null, 2));
