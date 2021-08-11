import React from "react";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Tasks from "./components/Tasks/Tasks";

import ExecuserState from "./context/execusers/execuserState";
import ServerState from "./context/servers/serverState";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { authProvider } from "./Auth/authProvider";
import { AzureAD } from "react-aad-msal";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        main: "#58A26A",
                    },
                    type: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AzureAD provider={authProvider}>
                {({ login, authenticationState }) => {
                    return (
                        <ServerState>
                            <ExecuserState>
                                <Router>
                                    <Switch>
                                        <Route
                                            exact
                                            path="/login"
                                            component={Login}
                                        ></Route>
                                        <Route exact path="/">
                                            {authenticationState ? (
                                                <Home />
                                            ) : (
                                                <Redirect to="/login" />
                                            )}
                                        </Route>
                                        <Route exact path="/admin">
                                            {authenticationState ? (
                                                <Admin />
                                            ) : (
                                                <Redirect to="/login" />
                                            )}
                                        </Route>
                                        <Route exact path="/tasks">
                                            {authenticationState ? (
                                                <Tasks />
                                            ) : (
                                                <Redirect to="/login" />
                                            )}
                                        </Route>
                                    </Switch>
                                </Router>
                            </ExecuserState>
                        </ServerState>
                    );
                }}
            </AzureAD>
        </ThemeProvider>
    );
}

export default App;
