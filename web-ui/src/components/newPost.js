import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../_actions/postActions';

class NewPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            body: "" 
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({   
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            title: "Dummy",
            body: this.state.body
        };
        
        this.props.createPost(post);
         
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Create new post ...
                        </div>
                    </div>
                    
                    { /*onChange="" */}
                    <input  className="form-control"
                        name="body"
                        type="text"
                        value={this.state.body}
                        onChange={this.onChange}
                        aria-label="New Post"
                        size="140"
                    />
                    
                    { /*onClick="" */}
                    <button className="btn btn-primary"
                        name="buttontweet"
                        value=""
                    >tweet</button>
                </div>
            </form>
        );
    }

}

NewPost.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(NewPost);
