module Main exposing (..)

import Html exposing (Html, div, text)
import CssModules exposing (class)
import Nested.Nested as Nested
import Styles


view : Model -> Html Msg
view _ =
    div
        [ class Styles.something ]
        [ text "this is a div"
        , Nested.view
        ]


main =
    Html.beginnerProgram
        { model = 0
        , view = view
        , update = update
        }


type Msg
    = Noop


type alias Model =
    Int


update _ _ =
    0
