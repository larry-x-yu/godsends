import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "./Scream";
import Profile from "./Profile";

export class Home extends Component {
    state = {
        screams: null
    };

    componentDidMount() {
        axios
            .get("/screams")
            .then(res => {
                this.setState({ screams: res.data });
            })
            .catch(err => {
                console.log("Error getting screams from server: " + err);
            });
    }

    render() {
        let screams = this.state.screams ? (
            this.state.screams.map((s: any) => (
                <Scream key={s.id} scream={s}></Scream>
            ))
        ) : (
            <p>Loading...</p>
        );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {screams}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        );
    }
}

export default Home;
