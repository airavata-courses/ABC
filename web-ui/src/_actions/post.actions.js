import { postConstants } from '../_constants';

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
        timeout(1000, fetch(`http://192.168.1.69:8080/tweet/getByUserId/${id}`))
            .then(res => res.json())
            .then(posts => dispatch({
                type: postConstants.FETCH_POSTS,
                payload: posts
            })
            ).catch(error => console.log("Timeout on Fetching posts"));
    }
}

export function createPost(postData) {
    return function (dispatch) {
        // fetch(  'https://jsonplaceholder.typicode.com/posts', {
        fetch('http://192.168.1.69:8080/tweet/create/', {
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
        fetch(`http://192.168.1.69:8080/tweet/deleteByTweetId/${postId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }
}
