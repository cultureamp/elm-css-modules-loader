# CSS Modules for Elm

A [Webpack][webpack] loader that enables you to reference CSS modules in Elm
source files.

Hat tip to NoRedInk and its [elm-assets-loader][elm-assets-loader], which
formed the technical basis for this package.

## Overview

Start with a CSS file that can be imported by Webpack using
[css-loader][css-loader]:

```css
.something {
  ⋮
}

.anotherThing {
  ⋮
}
```

In any Elm module, reference this stylesheet and the classes you want to use in
it:

```elm
module Main exposing (..)

import CssModules exposing (css)


styles =
    css "./stylesheet.css" -- relative to main Elm source directory
        { something = "something" -- string value should match CSS class name 
        , anotherThing = "anotherThing"
        }
```

Then use the returned functions to use the class names in your view:

```elm
view : Html Msg
view =
    div
        [ styles.class .something ]
        [ text "this is a div"]
```

**Note:** the `.something` syntax may be confusing at first. This is just standard Elm syntax for a function that reaches into a record and returns the value of the `something` key. Because the Elm compiler will only let you reference class names that exist in your CSS Module declaration, you get a bit of type safety to guard against typing mistakes.

## Why does this exist?

We wanted to use the same style sheets for the standard components in our
application (buttons, form fields, etc.) across two different implementations
of these components ([React][react] and [Elm][elm]). We love the namespacing and
composition features of [CSS Modules][css-modules]; this project seeks to make
them usable within Elm views.

**Note:** [elm-css][elm-css] is the de facto standard for writing styles for
HTML interfaces written in Elm. If you are working on an all-Elm application,
you should probably use that.

## How to use

To get this working, you need to set up a combination of a Webpack loader and
and Elm package.

### Webpack Loader

Add the `elm-css-modules-loader` NPM package to your project, then configure
Webpack to chain it with [elm-webpack-loader][elm-webpack-loader]:

#### Webpack 2+

```javascript
module.exports = {
  ⋮
  module: {
    rules: [
      {
        test: /\.elm$/,
        use: [
          {
            loader: 'elm-css-modules-loader',
          },
          {
            loader: 'elm-webpack',
          }
        ],
      },
      ⋮
    ],
  },
};
```

#### Webpack 1.x

```javascript
module.exports = {
  ⋮
  module: {
    loaders: [
      {
        test: /\.elm$/,
        loaders: [
          'elm-css-modules-loader',
          'elm-webpack',
        ],
      },
      ⋮
    ],
  },
};
```

Note the following configuration options are available for the loader. If you’re
using the original version of this package, the defaults should work fine.

`package` – (default: `cultureamp/elm-css-modules-loader`) The Elm package in
which the `CssModule` type is defined. If you forked the Elm package for your
own development, you’ll need to specify the full package name that you have
released it under with this option.

`module` – (default: `CssModules`) The name of the Elm module in which the
`tagger` function is defined.

`tagger` – (default: `css`) The name of the Elm factory function that is used
to declare CssModules in your code.

**Note:** Don't set `noParse` on .elm files. Otherwise, the JavaScript `require`s that this loader adds to your compiled Elm modules won't be processed by Webpack.

### Elm Package

Install the `cultureamp/elm-css-modules-loader` package in your Elm project,
then use the `CssModule` constructor for referencing CSS modules.

## Under the hood

Let’s walk through what happens when this Elm code is processed by Webpack:

```elm
styles =
    css "./stylesheet.css"
        { something = "something"
        , anotherThing = "anotherThing"
        }
```

This will be compiled to JavaScript by elm-webpack-loader:

```js
var user$project$Styles$styles = A2(
  cultureamp$elm_css_modules_loader$CssModules$css,
  './stylesheet.css',
  {
    aC: 'something',
    aD: 'anotherThing'
  }
);
```

elm-css-modules-loader replaces the hard-coded JSON object with a `require` of your stylesheet:

```js
var user$project$Styles$styles = A2(
  cultureamp$elm_css_modules_loader$CssModules$css,
  './stylesheet.css',
  {
    aC: require('./stylesheet.css').something,
    aD: require('./stylesheet.css').anotherThing
  }
);
```

webpack parses this `require` call, processes the stylesheet with css-loader, and replaces the `require` with a reference to the CSS module:

```js
var user$project$Styles$styles = A2(
  cultureamp$elm_css_modules_loader$CssModules$css,
  './stylesheet.css',
  {
    aC: __webpack_require__(42).something,
    aD: __webpack_require__(42).anotherThing
  }
);
```

The CSS module loaded by `__webpack_require__(42)` contains the actual class names that your Elm app will now consume:

```js
42:
function(module, exports) {
  module.exports = {
    something: 'something-abc123',
    anotherThing: 'anotherThing-abc123'
  };
}
```

[css-loader]: https://www.npmjs.com/package/css-loader
[css-modules]: https://github.com/css-modules/css-modules
[elm]: http://elm-lang.org
[elm-assets-loader]: https://github.com/NoRedInk/elm-assets-loader
[elm-css]: https://github.com/rtfeldman/elm-css
[elm-webpack-loader]: https://www.npmjs.com/package/elm-webpack-loader
[react]: https://facebook.github.io/react/
[webpack]: https://webpack.js.org

## Changelog

Our release history is tracked on the [Github Releases page](https://github.com/cultureamp/elm-css-modules-loader/releases).

Note that the NPM package and the Elm package will have different version numbers, as changes to the Elm API may happen indepently of changes to the NPM API, and Elm does not allow you to bump the version number without changes to the Elm API. When viewing the releases page, NPM releases are tagged with a "v" - `v2.1.0`. While Elm releases are tagged with no leading "v" - `2.0.3`.

For release history prior to 2.0.2, you can view our [old CHANGELOG](https://github.com/cultureamp/elm-css-modules-loader/blob/6afcae3f61439f9a0f05cb84bb6a1aea2f1acd81/CHANGELOG.md)
.
