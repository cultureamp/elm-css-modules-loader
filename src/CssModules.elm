module CssModules exposing
    ( css
    , Helpers
    )

{-| This library lets you reference classes defined in CSS modules in your Elm
views, and then have the actual class names injected into your Elm modules by
Webpack at build time.

@docs css
@docs Helpers

-}

import Html
import Html.Attributes


{-| Use a CSS module in your Elm application.

    styles =
        css "./styles.css"
            { someClass = "someClass"
            , anotherClass = "anotherClass"
            }

    view =
        div [ styles.class .someClass ]

This function returns a record, containing functions for accessing the CSS
module’s class names. See [`Helpers`](#Helpers) for a description of these
functions.

The CSS filename’s path is relative to either 1) a Webpack module root
directory, or 2) the JavaScript file in which your top-level Elm module is
referenced (in which case the path should begin with with `./`).

**Important:** The CSS filename must be a literal string.

Each of the classes in the list must have the value of the corresponding class
name, which will be substituted for a require of the CSS module by the Webpack
loader at build time.

**Warning:** Currently, if you list a class that is not defined in the CSS
module, it will receive a value of `undefined` at runtime, which is likely to
result in `class="undefined"`.

-}
css : String -> classes -> Helpers classes msg
css stylesheet classes =
    let
        cssModule =
            CssModule stylesheet classes
    in
    { class = class cssModule
    , classList = classList cssModule
    , toString = toString cssModule
    }


{-| A set of functions for accessing the class names in a CSS module.

`class` and `classList` are drop-in replacements for their counterparts in
`Html.Attributes`, except they take a record accessor to specify a class name
from your CSS module (e.g. `.someClass`).

    view =
        div
            [ classList
                [ ( .someClass, True )
                , ( .anotherClass, False )
                ]
            ]

`toString` lets you obtain the raw `String` for a given class name, which you
might need if you're mixing CSS Module classes together with plain string class
names.

-}
type alias Helpers classes msg =
    { class : (classes -> String) -> Html.Attribute msg
    , classList : List ( classes -> String, Bool ) -> Html.Attribute msg
    , toString : (classes -> String) -> String
    }


type CssModule classes
    = CssModule String classes


{-| Use a CSS module class as an HTML class attribute’s value.

    let
        classes =
            CssModule "./styles.css"
                { someClass = "someClass" }
    in
    Html.div [ class classes .someClass ]

-}
class : CssModule classes -> (classes -> String) -> Html.Attribute msg
class (CssModule _ classes) accessor =
    Html.Attributes.class (accessor classes)


{-| Combine a list of CSS module classes as an HTML class attribute’s value.

    let
        classes =
            CssModule "./styles.css"
                { message = "message"
                , important = "important"
                }
    in
    Html.div
        [ classList
            classes
            [ ( .message, True )
            , ( .important, message.isImportant )
            ]
        ]

-}
classList : CssModule classes -> List ( classes -> String, Bool ) -> Html.Attribute msg
classList (CssModule _ classes) list =
    Html.Attributes.classList <|
        List.map (Tuple.mapFirst (\accessor -> accessor classes)) list


{-| Access the raw `String` for a CSS module class.

    let
        classes =
            CssModule "./styles.css"
                { someClass = "someClass" }
    in
    toString classes .someClass

-}
toString : CssModule classes -> (classes -> String) -> String
toString (CssModule _ classes) accessor =
    accessor classes
