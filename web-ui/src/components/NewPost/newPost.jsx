import React, { Component } from "react";

class NewPost extends Component{

    render() {
        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        Create new post ...
                    </span>
                </div>
                <input className="form-control" aria-label="New Post"></input>
            </div>
        );
    }

}

export default NewPost;