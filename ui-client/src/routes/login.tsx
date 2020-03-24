import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import css from "./login.module.scss";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

interface Props {
    history: any;
    loginUser: (userData: any, history: any) => void;
    UI: any
}

export class login extends Component<Props> {
    handleSubmit = event => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    state = {
        email: "",
        password: ""
    };

    render() {
        const { UI: { loading, errors } } = this.props;
        const errorMessages =
            errors && errors['general'] ? errors['general'] : null;

        return (
            <Grid container className={css.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img
                        src="/images/monkey.png"
                        alt="Monkey"
                        className={css.image}
                    />
                    <Typography variant="h2">Login</Typography>
                    {errorMessages && (
                        <Typography
                            variant="body2"
                            color="error"
                            component={"div"}
                        >
                            <div>{errorMessages}</div>
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
                            className={css["text-field"]}
                            required={true}
                            fullWidth
                        ></TextField>
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={css["text-field"]}
                            required={true}
                            fullWidth
                        ></TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 20, position: "relative" }}
                            disabled={loading}
                        >
                            LOGIN
                            {loading && (
                                <CircularProgress
                                    size={30}
                                    className={css.progress}
                                ></CircularProgress>
                            )}
                        </Button>
                        <br />
                        <small>
                            Don't have an account? Sign up
                            <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(login);
