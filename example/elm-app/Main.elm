module Main exposing (..)

import Html exposing (Html, div, text)
import CssModules exposing (class)
import Nested.Nested as Nested
import Styles exposing (styles)


view : () -> Html ()
view () =
    div
        [ class styles .nonexistent ]
        [ text "this is a div"
        , Nested.view
        ]


main : Program Never () ()
main =
    Html.beginnerProgram
        { model = ()
        , update = \() () -> ()
        , view = view
        }
