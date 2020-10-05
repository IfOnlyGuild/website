import React from "react"
import banner from './banner.png'; // banner
//import icon from './icon.png'; // banner

//Main title commented below
//<Typography variant="h2">The IfOnly Guild</Typography>
                /* {
                  <Centered>
                  <div>
                  <img src={icon} width="200" height="200" alt="IfOnly Banner" />
                  </div>
                  </Centered>
                  }
                  <Divider style={{ margin: 20 }} /> */


import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Button,
    Divider,
} from "@material-ui/core"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { Chat } from "@material-ui/icons"
import green from "@material-ui/core/colors/green"
import blue from "@material-ui/core/colors/blue"

//DARK MODE
import Darkmode from 'darkmode-js';

const options = {
  bottom: '10px', // default: '32px'
  right: '10px', // default: '32px'
  left: 'unset', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}
const darkmode = new Darkmode(options);
darkmode.showWidget();
//DARK MODE

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[700],
        },
        secondary: blue,
    },
})

const navbarItems = [
    <a href="https://discord.gg/DmAqWfQ" className="navlink">
        <Button color="inherit" startIcon={<Chat />}>
            Discord
        </Button>
    </a>,
]

export default () => {
    let Centered = (props) => (
        <Grid container justify="center">
            {props.children}
        </Grid>
    )

    return (
        <ThemeProvider theme={theme}>
            <nav style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography style={{ flexGrow: 1 }} variant="h6">
                            The IfOnly Guild
                        </Typography>
                        {navbarItems}
                    </Toolbar>
                </AppBar>
            </nav>
            <main className="main">
                <Grid container>
                    <Centered>
                        {
                        <div>
                            <img src={banner} width="719.875" height="191.875" alt="IfOnly Banner" />
                        </div>
                        }
                    </Centered>
                    <Centered>
                        <Typography variant="subtitle">
                            A Hypixel guild based on the community.
                        </Typography>
                    </Centered>
                </Grid>
                <Divider style={{ margin: 5 }} />
                <Grid container>
                    <Centered>
                        <Typography variant="h5">About</Typography>
                    </Centered>
                    <Centered>
                        <Typography
                            variant="body1"
                            style={{ textAlign: "center" }}>
                            IfOnly is a Hypixel guild founded back in early
                            2018. It grew quite big over time and eventually
                            surpased 90 members. Originally, the guild was based
                            more on minigame skill as well as competitive
                            statistics, but over time we realized that we have
                            something special: our community. We have since
                            stopped requiring high statistics/skill levels, and
                            now focus primarily on our players. We regularly
                            host events, giveaways, and more!
                        </Typography>
                    </Centered>
                </Grid>
                <Divider style={{ margin: 5 }} />
                <Grid container>
                    <Centered>
                        <Typography variant="h5" style={{ marginTop: 20 }}>Benefits</Typography>
                    </Centered>
                    <Centered>
                        <Typography
                            variant="body1"
                            style={{ textAlign: "center" }}>
                            Our guild has a lot of things to offer to our
                            members, including weekly game nights, an SMP
                            server, the [I] tag on Hypixel, and lots of friendly
                            faces to play and chat with!
                        </Typography>
                    </Centered>
                </Grid>
                <Divider style={{ margin: 5 }} />
                <Grid container>
                    <Centered>
                        <Typography variant="h5" style={{ marginTop: 20 }}>Join Us</Typography>
                    </Centered>
                    <Divider style={{ margin: 5 }} />
                    <Centered>
                        <Typography
                            variant="body1"
                            style={{ textAlign: "center" }}>
                            If you want to join, feel free! Simply join our
                            Discord, tell us a bit about yourself, and you will
                            get the benefits we have to offer!
                        </Typography>
                    </Centered>
                </Grid>
                <Divider style={{ margin: 5 }} />
            </main>
        </ThemeProvider>
    )
}
