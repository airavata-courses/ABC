import React, { Component } from "react";
import "./styles.css";

class Profile extends Component{
    render() {
        return (
            <div className="card UserProfile">
                <img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" alt="User Placeholder" className="img-thumbnail rounded-circle"/>
                <h3>Username</h3>
                <p>Bio of user goes here</p>
                <div className="UserConnection">
                    <p className="text-info">0 Followers</p>
                    <p className="text-info">0 Following</p>
                </div>
            </div>
        );
    }
}

export default Profile;