import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import "./Profile.scoped.scss";
import { Link, Redirect } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import dayjs from "dayjs";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { updateAvatar } from "../redux/actions/userActions";

interface PropTypes {
    user: any;
    updateAvatar;
}

const AuthenticatedProfile = (props) => {
    const { user: { profile: { userId, alias, email, createdAt, img, bio, website, location }, loading, isAuthenticated } } = props;
    return (
        <Paper className="paper">
            <div className="profile">
                <div className="image-wrapper">
                    <img src={img} alt="profile image" className="profile-image" />
                    <input type="file" id="imageInput" onChange={props.handleImageChange} />
                    <Tooltip title="Edit profile picture" placement="top">
                        <IconButton onClick={props.handleEditAvatar}>
                            <EditIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${userId}`} color="primary" variant="h5">
                        @{email}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <>
                            <LocationOn color="primary" /><span>{location}</span>
                            <hr />
                        </>)
                    }
                    {
                        website && (
                            <>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr />
                            </>
                        )
                    }
                    <CalendarToday color="primary" />{' '}
                    <span>Joined since {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    )
}

const UnauthenticatedProfile = props => {
    return (
        <Paper className="paper">
            <Typography variant="body2" align="center">
                No profile found, please login again
            </Typography>
            <div className="buttons">
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Login
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/signup">
                    Signup
                </Button>
            </div>
        </Paper>
    );
}

class Profile extends Component<PropTypes> {
    handleImageChange = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("avatar", image, image.name);
        console.log(this.props);
        this.props.updateAvatar(this.props.user?.profile?.id, formData);
    };

    handleEditAvatar = event => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    render() {
        const {
            user: { profile: { userId, alias, createdAt, image, bio, website, location }, loading, isAuthenticated }
        } = this.props;

        let profileMarkup = !loading ? (isAuthenticated ? (
            <AuthenticatedProfile {...this.props} handleImageChange={this.handleImageChange} handleEditAvatar={this.handleEditAvatar} />
        ) : (<UnauthenticatedProfile />)) : (<p>Loading...</p>);

        return profileMarkup;
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    updateAvatar
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
