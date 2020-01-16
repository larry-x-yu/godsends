import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({
    component: Component,
    user: { isAuthenticated },
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(AuthRoute);
