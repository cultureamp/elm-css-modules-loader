module CssModules exposing (Class, class, classList)

import Html
import Html.Attributes


type alias Class =
    { className : String
    , modulePath : String
    }


{-| Use a tagged CSS class as an HTML class attribute’s value.

    Html.div [ class <| Class "className" "styles.css" ]
-}
class : Class -> Html.Attribute msg
class { className } =
    Html.Attributes.class className


{-| Combine a list of tagged CSS classes as an HTML class attribute’s value.

    Html.div [ classList
        [ (Class "someClass" "styles.css", True) -- or False to skip
        , (Class "anotherClass "styles.css", True)
        ]
-}
classList : List ( Class, Bool ) -> Html.Attribute msg
classList list =
    let
        unwrap ( { className }, bool ) =
            ( className, bool )
    in
        Html.Attributes.classList <| List.map unwrap list
