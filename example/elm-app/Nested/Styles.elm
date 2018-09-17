module Nested.Styles exposing (..)

import CssModules exposing (css)


styles =
    css "./Nested/Nested.css"
        { nested = "nested" }
