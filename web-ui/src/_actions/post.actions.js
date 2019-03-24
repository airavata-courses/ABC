import { postConstants } from '../_constants';
import { FEED_URL } from '../_constants';
// Rough implementation. Untested.
function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout( function() {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

export function fetchPosts(id) {
    return function (dispatch) {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        timeout(5000, fetch(`${FEED_URL}/feed/create/${id}`))
            .then(res => res.json())
            .then(posts => dispatch({
                type: postConstants.FETCH_POSTS,
                payload: posts
            })
            ).catch(error => console.log("Timeout on Fetching posts"));
    }
}

export function createPost(postData) {
    console.log(postData)
    return function (dispatch) {
        // fetch(  'https://jsonplaceholder.typicode.com/posts', {
        fetch(`${FEED_URL}/tweet/create/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)

        })
            .then(res => res.json())
            .then(post => dispatch({
                type: postConstants.NEW_POST,
                payload: post
            }));
    }
}
/*
export function updateLikeCount(postData) {
    return function (dispatch) {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PATCH',
            body: JSON.stringify({
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
    }
} */

export function updateLikeCount(postData) {
    console.log('updatelikecount called with', postData);
    console.log(` fetching: ${FEED_URL}/likes/tweetLike/${postData.userId}/${postData.tweetId}`)
    return function (dispatch) {
        console.log('inside function');
        fetch(`${FEED_URL}/likes/tweetLike/${postData.userId}/${postData.tweetId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: ""
        })
            .then(res => console.log('res: ', res))
            .then(dispatch({
                type: postConstants.LIKE_POST,
                payload: postData
            }));
    }
}

export function deletePost(postId) {
    console.log("Deleting");
    // return function (dispatch) {
    //     fetch("http://192.168.1.69:8080/tweet/deleteByTweetId/"+postId, {
    //         method: 'DELETE'
    //     })
    //         .then(res => res.json())
    //         .then(post => console.log(post));
    // }

    return function (dispatch) {
        fetch(`${FEED_URL}/tweet/deleteByTweetId/${postId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }
}
