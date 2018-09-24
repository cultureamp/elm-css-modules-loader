module Main exposing (..)

import Browser
import Html exposing (Html, div, text)
import Nested.Nested as Nested
import Styles exposing (styles)


view : () -> Html ()
view () =
    div
        [ styles.class .something ]
        [ text "this is a div"
        , Nested.view
        ]


main : Program () () ()
main =
    Browser.sandbox
        { init = ()
        , update = \() () -> ()
        , view = view
        }
