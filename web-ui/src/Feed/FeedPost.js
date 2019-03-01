import React, { Component } from 'react';
import './styles.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LikeButton } from './LikeButton';


class FeedPost extends Component {

    render() {
        console.log('Feedpost props: ', this.props);
        return (
            <div className="card border-dark mb-3">
                <div className="card-header PostUserInfo">
                    <img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" alt="User Placeholder" className="img-thumbnail rounded-circle" width="50" height="50" />
                    <h5 style={{ padding: 10 }}>{/* props.data.firstName} {props.data.lastName*/} Username - {this.props.data.userName}</h5>
                </div>

                <div className="card-body">
                    <p className="card-text text-dark"> {this.props.data.tweetText}</p>
                    <LikeButton
                        index={this.props.index}
                        disabled={false}
                        likeCount={this.props.data.likeCount}
                        tweetId={this.props.data.id}
                        userId={this.props.user.id}
                    />
                </div>
            </div>
        );
    }
}


// Type checking
FeedPost.propTypes = {

};

// redux updates the states, map states and props here
const mapStateToProps = state => ({

});


const connectedFeed = connect(mapStateToProps, {})(FeedPost);
export { connectedFeed as FeedPost };