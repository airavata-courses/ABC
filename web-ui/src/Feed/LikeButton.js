import React, { Component } from 'react';
import './styles.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLikeCount } from '../_actions/post.actions';


class LikeButton extends Component {

    incrementLike(tweetId, userId) {
        this.props.updateLikeCount({ tweetId, userId });
    }

    render() {
        this.index = this.props.index;
        return (
            <button className="btn btn-primary"
                onClick={() => this.incrementLike(this.props.tweetId, this.props.userId)}
                disabled={false}>
                <span className="badge">
                    {this.props.likeCount} Like{this.props.likeCount == 1 ? '' : 's'}
                </span>
            </button>
        );
    }
}


// Type checking
LikeButton.propTypes = {
    updateLikeCount: PropTypes.func.isRequired
};

// redux updates the states, map states and props here
const mapStateToProps = state => ({
    // likeCount: state.posts.items[0].likeCount
});

const connectedFeed = connect(mapStateToProps, { updateLikeCount })(LikeButton);
export { connectedFeed as LikeButton };