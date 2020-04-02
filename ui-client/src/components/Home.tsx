import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "./Scream";
import Profile from "./Profile";

const Home = () => {

    let [screams, setScreams] = useState([]);

    const getScreems = () => {
        axios
            .get("/screams")
            .then(res => {
                setScreams(res.data);
            })
            .catch(err => {
                console.log("Error getting screams from server: " + err);
            });
    }

    useEffect(() => getScreems());

    let screamMarkups = screams ? (
        screams.map((s: any) => (
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
                <Profile />
            </Grid>
        </Grid>
    );
}

export default Home;
