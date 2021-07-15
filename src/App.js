import React from "react";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Tasks from "./components/Tasks/Tasks";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/admin" component={Admin}></Route>
                <Route exact path="/tasks" component={Tasks}></Route>
            </Switch>
        </Router>
    );
}

export default App;
