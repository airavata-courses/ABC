import React, { Component } from 'react';
import Profile from '../components/profile';
import NewPost from '../components/newPost';
import FeedPost from '../components/feedPost';
import { fetchPosts } from '../_actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';

class Feed extends Component{
    
    componentWillMount() {
        this.props.fetchPosts()
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            console.log(nextProps.newPost);
            this.props.posts.unshift(nextProps.newPost);
        }
    }
    incrementLike () {
        //Likes will be incremented on server
        this.setState({ likeCount : this.state.likeCount + 1});
    }

    render() {
        const postItems = this.props.posts.map(
            post => (
                <FeedPost key={post.id}onClickMethod={this.incrementLike} data={post} />
            )
        ) 
        return (
            <div className="row FeedPage">
                <div className="col-2">
                    <Profile/>
                </div>
                <div className="col-8">
                    <NewPost/>
                    <br />
                    {postItems}
                </div>
            </div>
        );
    }

}

Feed.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
};

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Feed);
