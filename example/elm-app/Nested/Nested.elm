module Nested.Nested exposing (view)

import Html exposing (Html, div, text)
import Nested.Styles exposing (styles)


view : Html msg
view =
    div [ styles.class .nested ] [ text "This is a nested div" ]
