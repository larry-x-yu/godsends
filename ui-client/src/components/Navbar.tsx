import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { connect } from "react-redux";

const Navbar = ({ user}) => {
    const pathname = window.location.pathname;
    return (
        <AppBar>
            <Toolbar className={styles['nav-container']}>
                <Button color="inherit" component={Link} to="/" disabled={pathname === "/"}>
                    Home
                    </Button>
                <Button color="inherit" component={Link} to="/login" disabled={user.isAuthenticated || pathname === "/login"}>
                    Login
                    </Button>
                <Button color="inherit" component={Link} to="/signup" disabled={user.isAuthenticated || pathname === "/signup"}>
                    Sign Up
                    </Button>
                <Button color="inherit" component={Link} to="/logout" disabled={!user.isAuthenticated}>
                    Logout
                    </Button>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(Navbar);

