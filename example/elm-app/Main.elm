module Main exposing (..)

import Html exposing (Html, div, text)
import CssModules exposing (class)
import Nested.Nested as Nested
import Styles exposing (classes)


view : () -> Html ()
view () =
    div
        [ class .something classes ]
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
