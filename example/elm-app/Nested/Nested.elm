module Nested.Nested exposing (view)

import Html exposing (Html, div, text)
import Nested.Styles exposing (class)


view : Html msg
view =
    div [ class .nested ] [ text "This is a nested div" ]
