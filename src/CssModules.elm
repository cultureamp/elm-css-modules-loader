module CssModules exposing (..)

{-| This library lets you reference classes defined in CSS modules in your Elm
views, and then have the actual class names injected into your Elm modules by
Webpack at build time.

# Definition
@docs CssModule

# Using Module Classes
@docs class, classList

-}

import Html
import Html.Attributes


{-| Declare a CSS module that you wish to use in your Elm application.

    classes = CssModule "./styles.css"
        { someClass = ""
        , anotherClass = ""
        }

The Webpack loader recognises this constructor in the JavaScript code generated
by the Elm compiler. **The CSS filename must be a literal string.**

The CSS file path is relative to either 1) a Webpack module root directory, or
2) the JavaScript file in which your top-level Elm module is referenced (in
which case the path should begin with with `./`).

Each of the classes in the list may be set to any string, but it’s probably
easiest just to leave them as empty strings, since these will be replaced with
the actual class names by the Webpack loader at build time.

**Warning:** Currently, if you list a class that is not defined in the CSS
module, it will receive a value of `undefined` at runtime, which is likely to
result in `class="undefined"`.

-}
type CssModule classes
    = CssModule String classes


{-| Use a CSS module class as an HTML class attribute’s value.

    let
        classes = CssModule "./styles.css"
            { someClass = "" }
    in
        Html.div [ class .someClass classes ]

-}
class : (classes -> String) -> CssModule classes -> Html.Attribute msg
class accessor (CssModule _ classes) =
    Html.Attributes.class (accessor classes)


{-| Combine a list of CSS module classes as an HTML class attribute’s value.

    let
        classes = CssModule "./styles.css"
            { message = ""
            , important = ""
            }
    in
        Html.div
            [ classList
                [ (.message, True)
                , (.important, message.isImportant)
                ]
                classes
            ]

-}
classList : List ( classes -> String, Bool ) -> CssModule classes -> Html.Attribute msg
classList list (CssModule _ classes) =
    Html.Attributes.classList <|
        List.map (Tuple.mapFirst (\accessor -> accessor classes)) list
