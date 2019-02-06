import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

class Profile extends Component {

    render() {
        return (
            <div className="card UserProfile">
                <img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
                    alt="User Placeholder"
                    className="img-thumbnail rounded-circle"/>
                {this.props.user.firstName} {this.props.user.lastName}
                <br/> 
                <div className="UserConnection">
                    <Link to="followers">
                        Followers
                    </Link>
                    <br />
                    <Link to="/following">
                        Following
                    </Link>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authentication.user
});


export default connect(mapStateToProps)(Profile);;
