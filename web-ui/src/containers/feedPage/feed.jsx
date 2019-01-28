import React, { Component } from "react";
import Profile from "../../components/Profile/profile";
import NewPost from "../../components/NewPost/newPost";
import FeedPost from "../../components/FeedPost/feedPost";
import "./styles.css";

class Feed extends Component{

    render() {
        return (
            <div className="row FeedPage">
                <div className="col-2">
                    <Profile/>
                </div>
                <div className="col-8">
                    <NewPost/>
                    <FeedPost/>
                    <FeedPost/>
                    <FeedPost/>
                    <FeedPost/>
                    <FeedPost/>
                    <FeedPost/>
                    <FeedPost/>
                    <FeedPost/>
                </div>
            </div>
        );
    }

}

export default Feed;