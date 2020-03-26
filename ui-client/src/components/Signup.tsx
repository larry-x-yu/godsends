import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import isEmail from "validator/lib/isEmail";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

import "./Signup.scoped.scss";

interface Props {
    user: any,
    signupUser: (userData, history) => void;
    history: any;
}

export class Signup extends Component<Props> {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        handle: "",
        errors: {}
    };

    validateForm = () => {
        let valid = true;
        let errors = {};
        if (!this.state.email || !isEmail(this.state.email)) {
            errors = { email: "Email is invalid" };
            valid = false;
        }

        if (
            !this.state.password ||
            !this.state.confirmPassword ||
            this.state.password !== this.state.confirmPassword
        ) {
            errors = {
                ...errors,
                password: "Passwords do not match",
                confirmPassword: "Passwords do not match"
            };
            valid = false;
        }

        !valid && this.setState({ errors });
        return valid;
    };

    handleSubmit = event => {
        event.preventDefault();

        if (!this.validateForm()) {
            return false;
        }

        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.password,
            handle: this.state.handle
        };

        this.props.signupUser(userData, this.props.history);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {
            user: { signupErrors, signingUp: loading }
        } = this.props;

        const errors = { ...signupErrors, ...this.state.errors };
        const errorMessages = errors["general"] && <p>{errors["general"]}</p>;

        return (
            <Grid container className="form">
                <Grid item sm></Grid>
                <Grid item sm>
                    <img
                        src="/images/monkey.png"
                        alt="Monkey"
                        className="image"
                    />
                    <Typography variant="h2">Sign Up</Typography>
                    {errorMessages && (
                        <Typography
                            variant="body2"
                            color="error"
                            component={"div"}
                        >
                            {errorMessages}
                        </Typography>
                    )}
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="text-field"
                            required={true}
                            helperText={errors["email"]}
                            error={errors["email"] ? true : false}
                            fullWidth
                        ></TextField>
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="text-field"
                            required={true}
                            helperText={errors["password"]}
                            error={errors["password"] ? true : false}
                            fullWidth
                        ></TextField>
                        <TextField
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            label="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            className="text-field"
                            required={true}
                            helperText={errors["confirmPassword"]}
                            error={errors["confirmPassword"] ? true : false}
                            fullWidth
                        ></TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 20, position: "relative" }}
                            disabled={loading}
                        >
                            Signup
                            {loading && (
                                <CircularProgress
                                    size={30}
                                    className="progress"
                                ></CircularProgress>
                            )}
                        </Button>
                        <br />
                        <small>
                            Already have an account? Login{" "}
                            <Link to="/login">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
