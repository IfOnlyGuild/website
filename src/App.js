import React from "react"
import banner from "./banner.png"
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Button,
    FormControlLabel,
    Switch,
    Paper,
} from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import { Chat } from "@material-ui/icons"
import Centered from "./Centered"
import { mainPalette, darkPalette, useStyles } from "./styling"

/**
 * The items that appear on the navigation bar.
 * This is a factory so that the dark theme variable and its setter can be used
 * outside the scope of the hook.
 *
 * @param {boolean} darkTheme If the dark theme is enabled.
 * @param {(darkTheme: boolean) => void} setDarkTheme A setter for the dark theme variable value.
 * @param {any} classes The styles object.
 */
const navbarItems = (darkTheme, setDarkTheme, classes) => [
    <FormControlLabel
        key="darkThemeSwitch"
        control={
            <Switch
                checked={darkTheme}
                onChange={() => setDarkTheme(darkTheme ? false : true)}
                name="darkTheme"
            />
        }
        label="Dark Theme"
    />,
    <a
        href="https://discord.gg/DmAqWfQ"
        className={classes.navLink}
        key="discord"
    >
        <Button color="inherit" variant="outlined" startIcon={<Chat />}>
            Discord
        </Button>
    </a>,
]

/**
 * The component itself.
 */
export default () => {
    const classes = useStyles()
    const [darkTheme, setDarkTheme] = React.useState(false)

    const component = (
        <>
            <nav>
                <AppBar position="static" className={classes.flex}>
                    <Toolbar className={classes.nav}>
                        <Typography className={classes.flex} variant="h6">
                            The IfOnly Guild
                        </Typography>
                        {navbarItems(darkTheme, setDarkTheme, classes)}
                    </Toolbar>
                </AppBar>
            </nav>
            <main>
                <Paper className={classes.mainPaper}>
                    <Grid container className={classes.divider}>
                        <Centered>
                            {
                                <div>
                                    <img
                                        src={banner}
                                        width="719.875"
                                        height="191.875"
                                        alt="IfOnly Banner"
                                    />
                                </div>
                            }
                        </Centered>
                        <Centered>
                            <Typography variant="body2">
                                A Hypixel guild based on the community.
                            </Typography>
                        </Centered>
                    </Grid>
                    <Grid container className={classes.divider}>
                        <Centered>
                            <Typography variant="h4">About</Typography>
                        </Centered>
                        <Centered>
                            <Typography
                                variant="body1"
                                className={classes.center}
                            >
                                IfOnly is a Hypixel guild founded back in early
                                2018. It grew quite big over time and eventually
                                surpased 90 members. Originally, the guild was
                                based more on minigame skill as well as
                                competitive statistics, but over time we
                                realized that we have something special: our
                                community. We have since stopped requiring high
                                statistics/skill levels, and now focus primarily
                                on our players. We regularly host events,
                                giveaways, and more!
                            </Typography>
                        </Centered>
                    </Grid>
                    <Grid container className={classes.divider}>
                        <Centered>
                            <Typography variant="h4">Benefits</Typography>
                        </Centered>
                        <Centered>
                            <Typography
                                variant="body1"
                                style={{ textAlign: "center" }}
                            >
                                Our guild has a lot of things to offer to our
                                members, including weekly game nights, a private
                                modded survival server (a customly modified
                                version of Enigmatica 2), the [I] tag on
                                Hypixel, and lots of friendly faces to play and
                                chat with!
                            </Typography>
                        </Centered>
                    </Grid>
                    <Grid container className={classes.divider}>
                        <Centered>
                            <Typography variant="h4">Requirements</Typography>
                        </Centered>
                        <Centered>
                            <Typography
                                variant="body1"
                                className={classes.center}
                            >
                                We require that you get at least 50,000 guild XP
                                per week and remain active in the guild and
                                Discord server. If you are not able to complete
                                this during certain weeks (e.g. you are on
                                vacation), you are excused. Otherwise, you do
                                need to meet the requirement or you will get
                                kicked.
                            </Typography>
                        </Centered>
                    </Grid>
                    <Grid container className={classes.divider}>
                        <Centered>
                            <Typography variant="h4">Join Us</Typography>
                        </Centered>
                        <Centered>
                            <Typography
                                variant="body1"
                                style={{ textAlign: "center" }}
                            >
                                If you want to join, feel free! Simply join our
                                Discord, tell us a bit about yourself, and you
                                will get the benefits we have to offer!
                            </Typography>
                        </Centered>
                    </Grid>
                </Paper>
            </main>
        </>
    )

    if (darkTheme) {
        return <ThemeProvider theme={darkPalette}>{component}</ThemeProvider>
    }

    return <ThemeProvider theme={mainPalette}>{component}</ThemeProvider>
}
