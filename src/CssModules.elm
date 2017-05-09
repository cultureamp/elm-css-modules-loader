module CssModules exposing (..)

import Html
import Html.Attributes


type CssModule classes
    = CssModule String classes


{-| Use a tagged CSS class as an HTML class attribute’s value.

    Html.div [ class (CssModule "styles.css" {someClass = ""}) .someClass  ]
-}
class : CssModule classes -> (classes -> String) -> Html.Attribute msg
class (CssModule _ classes) accessor =
    Html.Attributes.class (accessor classes)


{-| Combine a list of tagged CSS classes as an HTML class attribute’s value.

   Html.div [ classList (CssModule "styles.css" {someClass = "", otherClass = ""})
       [ (.someClass, True) -- or False to skip
       , (.anotherClass, True)
       ]
-}
classList : CssModule classes -> List ( classes -> String, Bool ) -> Html.Attribute msg
classList (CssModule _ classes) list =
    List.map (Tuple.mapFirst (\accessor -> (accessor classes))) list
        |> Html.Attributes.classList
