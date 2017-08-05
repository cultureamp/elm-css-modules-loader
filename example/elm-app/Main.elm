module Main exposing (..)

import Html exposing (Html, div, text)
import Nested.Nested as Nested
import Styles exposing (class)


view : () -> Html ()
view () =
    div
        [ class .something ]
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
