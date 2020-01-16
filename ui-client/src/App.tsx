import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import home from "./routes/home";
import login from "./routes/login";
import signup from "./routes/signup";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import AuthRoute from "./components/AuthRoute";
import store from "./redux/reducers/store";
import { Provider } from "react-redux";
import logout from "./routes/logout";

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green
    }
});

const App: React.FC = (props: any) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar></Navbar>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={home} />
                                <AuthRoute
                                    exact
                                    path="/login"
                                    component={login}
                                />
                                <AuthRoute
                                    exact
                                    path="/signup"
                                    component={signup}
                                />
                                <Route
                                    exact
                                    path="/logout"
                                    component={logout}
                                />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </ThemeProvider>
        </>
    );
};

export default App;
