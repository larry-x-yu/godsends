import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { connect } from "react-redux";

export class Navbar extends Component<{user}> {
    render() {
        const {user: {isAuthenticated}} = this.props;
        return (
            <AppBar>
                <Toolbar className={styles['nav-container']}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                    <Button color="inherit" component={Link} to="/signup">
                        Sign Up
                    </Button>
                    <Button color="inherit" component={Link} to="/logout" disabled={!isAuthenticated}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => ({user: state.user});
export default connect(mapStateToProps)(Navbar);

