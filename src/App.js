import React from "react";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Tasks from "./components/Tasks/Tasks";

import ExecuserState from "./context/execusers/execuserState";
import LoginState from "./context/login/loginState";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { authProvider } from './Auth/authProvider';
import { AzureAD, AuthenticationState } from 'react-aad-msal';

function App() {
    
    return (
        <AzureAD provider={authProvider}>
            {
                ({login, authenticationState}) => {

                    return (
                        <LoginState>
                        <ExecuserState>
                            <Router>
                                <Switch>
                                    <Route exact path="/login" component={Login}></Route>
                                    <Route exact path="/">{authenticationState ? <Home /> : <Redirect to = '/login'/>}</Route>
                                    <Route exact path="/admin">{authenticationState ? <Admin /> : <Redirect to = '/login'/>}</Route>
                                    <Route exact path="/tasks">{authenticationState ? <Tasks /> : <Redirect to = '/login'/>}</Route>
                                </Switch>
                            </Router>
                        </ExecuserState>
                        </LoginState>
                    )
                }
            }
        </AzureAD>
    );
}

export default App;
