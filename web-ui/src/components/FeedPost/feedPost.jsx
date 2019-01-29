import React, { Component } from "react";
import "./styles.css";

class FeedPost extends Component{
    state = {
        username: "Username",
        likeCount : 0,
        postContent : "Post from other users go here"
    }

    incrementLike = () => {
        //Likes will be incremented on server
        this.setState({ likeCount : this.state.likeCount + 1});
    }

    render(){
        return(
            <div className="card border-dark mb-3">

                <div className="card-header PostUserInfo">
                    <img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" alt="User Placeholder" className ="img-thumbnail rounded-circle" width="50" height="50"/>
                    <h5 style={{ padding: 10 }}>{ this.state.username }</h5>
                </div>

                <div className="card-body">
                    <p className="card-text text-dark">{ this.state.postContent }</p>

                    <button className="btn btn-primary" onClick={ this.incrementLike } disabled={true}>
                        <span className="badge badge-light">
                            {this.state.likeCount }
                        </span> Like
                    </button>
                </div>
            </div>
        );
    }
}

export default FeedPost;