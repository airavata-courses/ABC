import { searchConstants } from '../_constants'
import { USER_URL } from '../_constants'
// Rough implementation. Untested.
function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout( function() {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

// export function searchUsers(postData) {
//     console.log(postData);
//     return function (dispatch) {
//         // fetch('https://jsonplaceholder.typicode.com/posts')
//         // timeout(1000, fetch(`http://192.168.1.69:8080/tweet/getByUserId/${usersearch}`))
//         timeout(5000, fetch(`${USER_URL}/user/search`, {
//             method: 'GET',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(postData)
// 
//         }))
//             .then(res => res.json())
//             .then(users => dispatch({
//                 type: searchConstants.SEARCH_USER,
//                 payload: users
//             })
//             ).catch(error => console.log("User Search: Timeout"));

/* {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)

        } */
//     }
// }

export function searchUsers(postData) {
    console.log(postData);
	console.log(`${USER_URL}/user/search`)
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    };
    return function (dispatch) {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // timeout(1000, fetch(`http://192.168.1.69:8080/tweet/getByUserId/${usersearch}`))
        fetch(`${USER_URL}/user/search`, requestOptions )
            .then(res => res.json())
            .then(users => dispatch({
                type: searchConstants.SEARCH_USER,
                payload: users
            })
            ).catch(error => console.log(error));
    }
}

// Name should be getFollowers
export function searchFollowers(userid) {
    return function (dispatch) {
        // fetch('https://jsonplaceholder.typicode.com/posts')

        timeout(5000, fetch(`${USER_URL}/user/${userid}/followers`))
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

        timeout(5000, fetch(`${USER_URL}/user/${userid}/following`))
            .then(res => res.json())
            .then(users => dispatch({
                type: searchConstants.SEARCH_FOLLOWING,
                payload: users
            })
            ).catch(error => console.log("Following fetch: Timeout"));
    }
}
