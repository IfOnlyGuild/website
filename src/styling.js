import { createMuiTheme, makeStyles } from "@material-ui/core/styles"
import { green } from "@material-ui/core/colors"

/**
 * A theme with our custom colors.
 *
 * @see https://material-ui.com/customization/palette/
 * @returns The theme object.
 */
export const mainPalette = createMuiTheme({
    palette: {
        primary: {
            main: green[700],
        },
        secondary: {
            main: "#ffffff",
        },
    },
})

/**
 * A theme with our custom colors and dark mode enabled.
 *
 * @see https://material-ui.com/customization/palette/#dark-mode
 * @returns The theme object.
 */
export const darkPalette = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: green[700],
        },
        secondary: {
            main: "#ffffff",
        },
    },
})

/**
 * Factory for styles.
 *
 * @see https://material-ui.com/styles/basics/#hook-api
 * @returns The styles object.
 */
export const useStyles = makeStyles((theme) => ({
    flex: {
        flexGrow: 1,
    },
    mainPaper: {
        borderRadius: "0px",
        padding: "15px",
    },
    divider: {
        margin: "5px",
    },
    center: {
        textAlign: "center",
    },
    navLink: {
        color: "white",
        textDecoration: "none",
    },
}))
