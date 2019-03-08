import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFollowing } from '../_actions/search.actions'
import { PopulateUser } from './PopulateUser'
import { followUser, unFollowUser } from '../_actions'
import PropTypes from 'prop-types';
import Profile from '../components/profile';
import { Link } from 'react-router-dom';
class Following extends Component {
    constructor(props) {
        super(props);
        this.toggleFollow = this.toggleFollow.bind(this); 
    }
    
    componentWillMount() {
        this.props.searchFollowing(this.props.user.id)
    }

    toggleFollow (userId, followUserId, doFollow) {
        console.log("Following--> userId: " + userId + ", followUserId: " + followUserId + ", doFollow: " + doFollow);

        const params = {
            follower: userId,
            following: followUserId
        }
        if (doFollow) {
            this.props.followUser(params);
        } else {
            this.props.unFollowUser(params);
        }
    }
    

    render() {
	console.log("FOLLOWING: ");
	console.log(this.props.following);
        const populateUsers = this.props.following.map(
            user => (
                <PopulateUser key={user.userId}
                    data={user}
                    user={this.props.user}
                    onClickToggleFollow={this.toggleFollow}
                />
            )
        )
        return (
            <div className="row">
                {console.log(this.props)}
                <div className="col-2">
                    <Profile key={this.props.user.id} user={this.props.user}/>
                    <br />
                    <Link to="/">
                        <button className="btn btn-block btn-info">
                            home
                        </button>
                    </Link>

                    <br />
                    <Link to="/login">

                        <button className="btn btn-block btn-danger">
                            Logout
                        </button>
                    </Link>
                </div>
                <div className="col-8">
                    {populateUsers}
                </div>
            </div>
        );
    }
}
Following.propTypes = {
    followUser: PropTypes.func.isRequired,
    unFollowUser: PropTypes.func.isRequired,
    searchFollowing: PropTypes.func.isRequired
};
function mapStateToProps (state) {
    return {
        following: state.search_result.following,
        user: state.authentication.user
    };
}

const connectedFollowing = connect(mapStateToProps, { searchFollowing, followUser, unFollowUser})(Following);
export {connectedFollowing as Following}

