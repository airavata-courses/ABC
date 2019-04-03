import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../_actions/post.actions';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetText: ""
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
        e.preventDefault()
        const post = {
            userId: this.props.user.id,
            userName: this.props.user.userName,
            tweetText: this.state.tweetText
        };

        // setTimeOut( function() {
        this.props.createPost(post);
        // }, 1000);

    }
    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
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
                    <input className="form-control"
                        name="tweetText"
                        type="text"
                        value={this.state.tweetText}
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

const mapStateToProps = state => ({
    user: state.authentication.user
});

//function mapStateToProps(state) {
//    console.log("----------------------------")
//    console.log(state)
//}

export default connect(mapStateToProps, { createPost })(NewPost);
