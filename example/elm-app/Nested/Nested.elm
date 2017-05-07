module Nested.Nested exposing (view)

import Html exposing (div, text)
import CssModules exposing (class)
import Nested.Styles as Styles


view =
    div [ class Styles.nested ] [ text "This is a nested div" ]
