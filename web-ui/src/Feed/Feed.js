import React, { Component } from 'react';
import Profile from '../components/profile';
import NewPost from '../NewPost/NewPost';
import NewsColumn from '../News/NewsColumn'
import { Link } from 'react-router-dom';
import { FeedPost } from './FeedPost';
import { fetchPosts, deletePost } from '../_actions';
import { fetchNews } from '../_actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';

class Feed extends Component{

    componentWillMount() {
        // :w
        this.props.fetchPosts(this.props.user.id);
        this.props.fetchNews();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            // this.props.posts.unshift(nextProps.newPost);
        }
    }
    incrementLike (id, username) {
        //Likes will be incremented on server
        // this.setState({ likeCount : this.state.likeCount + 1});
    }

    handleDeletePost (postId) {
        deletePost(postId);
    }

    render() {
        console.log("FEED Render");
        console.log(this.props);
        const postItems = this.props.posts.map(
            post => (
                <FeedPost key={post.id}
                    incrementLike={this.incrementLike}
                    data={post}
                    user={this.props.user}
                    onClickDelete={this.handleDeletePost}
                />
            )
        )
        return (

            <div className="row">

                {/* Keys passed just to get rid of error. No actual user.*/}
                <div className="col-2">
                    <Profile key={this.props.user.id} user={this.props.user}/>
                    <br />
                    <Link to="/search">
                        <button className="btn btn-block btn-info">
                            Search user
                        </button>
                    </Link>

                    <br />
                    <Link to="/login">

                        <button className="btn btn-block btn-danger">
                            Logout
                        </button>
                    </Link>
                </div>
                <div className="col-6">
                    <NewPost key={this.props.user.id}/>
                    <br />
                    {postItems}
                </div>
                                
                <div className="col-4">
                    <NewsColumn key={this.props.user.id} user={this.props.user} data={this.props.news.news} />
                </div>
            </div>
        );
    }

}

Feed.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    fetchNews: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
};

const mapStateToProps = state => ({
    news: state.news.news,
    posts: state.posts.items,
    newPost: state.posts.item,
    user: state.authentication.user
});


const connectedFeed = connect(mapStateToProps, { fetchPosts, fetchNews })(Feed);
export { connectedFeed as Feed };
