import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UsersList from "./components/usersList";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/main" component={Main} />
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId"
                    render={(props) => <UsersList {...props} />}
                />
                <Route
                    path="/users"
                    exact
                    render={(props) => <Users {...props} />}
                />
            </Switch>
        </>
    );
}

export default App;
