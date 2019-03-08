import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFollowers } from '../_actions/search.actions'
import { PopulateUser } from './PopulateUser'

import Profile from '../components/profile';
import { Link } from 'react-router-dom';
class Followers extends Component {

    componentWillMount() {
        this.props.searchFollowers(this.props.user.id)
    }

    toggleFollow () {
        console.log("in toggle follow");
    }
    
    render() {

        const populateUsers = this.props.followers.map(
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

function mapStateToProps (state) {
    return {
        followers: state.search_result.users,
        user: state.authentication.user
    };
}

const connectedFollower = connect(mapStateToProps, { searchFollowers })(Followers);
export {connectedFollower as Followers}

