module Styles exposing (..)

import CssModules exposing (CssModule(..))


styles =
    CssModule "./Main.css"
        { something = ""
        , somethingElse = ""
        , nonexistent = ""
        }
