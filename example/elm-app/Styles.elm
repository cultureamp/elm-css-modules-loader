module Styles exposing (..)

import CssModules exposing (css)


styles =
    css "./Main.css"
        { something = "something"
        , somethingElse = "somethingElse"
        }
