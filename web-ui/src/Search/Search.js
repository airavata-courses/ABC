import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../_actions/search.actions'
import { PopulateUser } from './PopulateUser'

import Profile from '../components/profile';
import { Link } from 'react-router-dom';
class Search extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userSearch: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("componentwillreceiveprops");
    //         console.log(nextProps);
    // }

    onSubmit(e) {
        e.preventDefault();

        // console.log("Search.js: Printin props from onSubmit");
        // console.log(this.props);
        const post = {
            userSearch: this.state.userSearch
        };

        // setTimeOut( function() {
        this.props.searchUsers(this.state.userSearch);
        // }, 1000);

    }

    toggleFollow () {
        console.log("in toggle follow");
    }
    render() {
        console.log(this.props.users.count)
        console.log(typeof this.props.users)
        // if (this.props.users.length === 0) {
        //     return (
        //         <h1> NO USER FOUND</h1>
        //     );
        // }
        const populateUsers = this.props.users.map(
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
                    <form onSubmit={this.onSubmit}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    Search user ...
                                </div>
                            </div>

                            <input  className="form-control"
                                name="userSearch"
                                type="text"
                                value={this.state.userSearch}
                                onChange={this.onChange}
                                aria-label="New Post"
                                size="140"/>

                            <button className="btn btn-primary"
                                name="buttonsearch"
                            >Search</button>
                        </div>
                    </form>
                    <br />
                    {populateUsers}

                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    console.log("maptoprops");
    console.log(state);

    return {
        users: state.search_result.users,
        user: state.authentication.user
    };
}

const connectedSearch = connect(mapStateToProps, { searchUsers })(Search);
export {connectedSearch as Search}

