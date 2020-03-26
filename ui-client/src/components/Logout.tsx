import React from "react";
import { Route, Redirect } from "react-router-dom";
import { setUnauthenticated } from "../redux/actions/userActions";
import { connect } from "react-redux";

const LogoutRoute = ({ user: { isAuthenticated }, ...rest }) => {
    return <Route {...rest} render={props => <Redirect to="/" />} />;
};

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => (dispatch => dispatch(setUnauthenticated()));
export default connect(mapStateToProps, mapDispatchToProps)(LogoutRoute);
