import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "./Scream.scoped.scss";

interface ScreamProps {
    scream: any;
}

export class Scream extends Component<ScreamProps, {}> {
    render() {
        const { scream } = this.props;
        // const dt = formatDatetimeWithTZShort(scream.createdAt);
        dayjs.extend(relativeTime);
        return (
            <Card className="card">
                <CardMedia image={scream.user.img} title="Profile Image" className="image" />
                <CardContent className="content">
                    <Typography
                        variant="h5"
                        color="primary"
                        component={Link}
                        to={`/users/${scream.user.id}`}
                    >
                        {scream.user.email}
                    </Typography>
                    <Typography variant="body1">{scream.body}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(scream.createdAt).fromNow()}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default Scream;
