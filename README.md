# CSS Modules for Elm

A [Webpack][webpack] loader that enables you to reference CSS modules in Elm
source files.

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
module Styles exposing (..)

import CssModules exposing (CssModule(..))


classes =
    CssModule "./stylesheet.css" -- relative to main Elm source directory
        { something = "" -- strings will be populated by Webpack at build time!
        , anotherThing = ""
        }
```

Then use the included `class` function to use the class names in your view:

```elm
module Main exposing (..)

import CssModules exposing (class)
import Styles exposing (classes)


view : Html Msg
view =
    div
        [ class .something classes ]
        [ text "this is a div"]
```

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

```javascript
module.exports = {
  ⋮
  module: {
    loaders: [
      {
        test: /\.elm$/,
        loaders: ['elm-css-modules-loader', 'elm-webpack'],
      },
      ⋮
    ],
  },
};
```

### Elm Package

Install the `CultureAmp/CssModules` package in your Elm project, then use the
features provided: the `CssModule` constructor (for referencing CSS modules),
and the `class` and `classList` HTML attribute functions.

## Known Limitations

Currently this only works with Webpack 1.x. Webpack 2 support is at the top the
our to-do list.

You cannot reference class names that are not valid Elm record keys.

## Development Roadmap

1.  Support Webpack 2.
2.  Add robustness, tests.

[css-loader]: https://www.npmjs.com/package/css-loader
[css-modules]: https://github.com/css-modules/css-modules
[elm]: http://elm-lang.org
[elm-css]: https://github.com/rtfeldman/elm-css
[elm-webpack-loader]: https://www.npmjs.com/package/elm-webpack-loader
[react]: https://facebook.github.io/react/
[webpack]: https://webpack.js.org
