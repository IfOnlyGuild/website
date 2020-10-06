import React from "react"
import { Grid } from "@material-ui/core"

/**
 * A component that centers its child elements.
 *
 * @param {{ children: JSX.Element }} props The component props.
 */
export default (props) => (
    <Grid container justify="center">
        {props.children}
    </Grid>
)
