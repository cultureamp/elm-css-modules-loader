# Release History: elm-css-modules-loader

## 2.0.x

### 2.0.0

✨ **New API!** Use the `CssModules.css` function to reference your stylesheet,
and get back a set of helper functions for referencing the classes it contains.
You no longer need to pass the CSS module around. See README.md for examples.
💔 `CssModules.CssModule` type is no longer exposed.
💔 `CssModules.class`, `classList` and `toString` functions are no longer
exposed.
💔 `tagger` configuration option for Webpack loader should now point to the
`css` function, not the `CssModule` constructor. The default has been changed
accordingly, so this should require no change for configurations that use the
default value.

## 1.1.x

### 1.1.2

👍 Add support for Webpack 2 and 3. Webpack 1 is still supported.

### 1.1.1

👍 Add note to README warning against use of `noParse` in Webpack config.

### 1.1.0

✨ Add `toString` helper function for accessing raw class name strings.

## 1.0.x

### 1.0.4

🐛 Update outdated examples in README.

### 1.0.3

👍 Make Elm package name customizable, required for use via elm-package.

### 1.0.2

👍 Allow Webpack 1.14.x.

### 1.0.1

👍 Loosen Webpack version requirements (now >= 1.15.0, < 2.0.0).

🐛 Make babel-generator a full dependency; don’t require host project to have it.

### 1.0.0

✨ First release.
