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


{ class, classList, id } =
    css "./stylesheet.css" -- relative to main Elm source directory
        { something = "" -- strings will be populated by Webpack at build time!
        , anotherThing = ""
        }
```

Then use the returned functions to use the class names in your view:

```elm
view : Html Msg
view =
    div
        [ class .something ]
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
{ class } =
    css "./stylesheet.css"
        { something = ""
        , anotherThing = ""
        }
```

This will be compiled to JavaScript by elm-webpack-loader:

```js
var _user$project$Main$_p0 = A2(
  _cultureamp$elm_css_modules_loader$CssModules$css,
  './stylesheet.css',
  { something: '', anotherThing: '' });
var _user$project$Main$class = _user$project$Main$_p0.$class;
```

elm-css-modules-loader replaces the hard-coded JSON object with a `require` of your stylesheet:

```js
var _user$project$Main$_p0 = A2(
  _cultureamp$elm_css_modules_loader$CssModules$css,
  './stylesheet.css',
  require('./stylesheet.css'));
var _user$project$Main$class = _user$project$Main$_p0.$class;
```

webpack parses this `require` call, processes the stylesheet with css-loader, and replaces the `require` with a reference to the CSS module:

```js
var _user$project$Styles$classes = A2(
  _cultureamp$elm_css_modules_loader$CssModules$CssModule,
  './stylesheet.css',
  __webpack_require__(42));
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

## Known Limitations

You cannot reference class names that are not valid Elm record keys. We work around this using CSS Modules to define an Elm-friendly class name that `composes` the incompatible class.

```css
.Nope {
  visibility: hidden;
}

.nope {
  composes: Nope;
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
