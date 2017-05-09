module Nested.Nested exposing (view)

import Html exposing (Html, div, text)
import CssModules exposing (class)
import Nested.Styles exposing (classes)


view : Html msg
view =
    div [ class classes .nested ] [ text "This is a nested div" ]
