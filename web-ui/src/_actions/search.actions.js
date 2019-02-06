import { searchConstants } from '../_constants'

// Rough implementation. Untested.
function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout( function() {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

export function searchUsers(usersearch) {
    return function (dispatch) {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // timeout(1000, fetch(`http://192.168.1.69:8080/tweet/getByUserId/${usersearch}`))
        timeout(1000, fetch('https://jsonplaceholder.typicode.com/posts'))
            .then(res => res.json())
            .then(users => dispatch({
                type: searchConstants.SEARCH_USER,
                payload: users
            })
            ).catch(error => console.log("User Search: Timeout"));
    }
}

// Name should be getFollowers
export function searchFollowers(userid) {
    return function (dispatch) {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        
        timeout(1000, fetch('https://jsonplaceholder.typicode.com/posts'))
            .then(res => res.json())
            .then(users => dispatch({
                type: searchConstants.SEARCH_FOLLOWERS,
                payload: users
            })
            ).catch(error => console.log("Followers fetch: Timeout"));
    }
}

// Name should be getFollowers
export function searchFollowing(userid) {
    return function (dispatch) {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // timeout(1000, fetch(`http://192.168.1.69:8080/tweet/getByUserId/${userid}`))
        
        timeout(1000, fetch('https://jsonplaceholder.typicode.com/posts'))
            .then(res => res.json())
            .then(users => dispatch({
                type: searchConstants.SEARCH_FOLLOWING,
                payload: users
            })
            ).catch(error => console.log("Following fetch: Timeout"));
    }
}
