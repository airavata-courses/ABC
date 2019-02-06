import { followConstants } from '../_constants'
import { USER_URL } from '../_constants';

export function followUser(postData) {
    console.log(postData)
    return function (dispatch) {
        fetch(`${USER_URL}/user/follow`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)

        })
            .then(res => res.json())
            .then(post => dispatch({
                type: followConstants.FOLLOW_USER,
                payload: post
            }));
    }
}

export function unFollowUser(postData) {
    console.log(postData)
    return function (dispatch) {
        fetch(`${USER_URL}/user/follow`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)

        })
            .then(res => res.json())
            .then(post => dispatch({
                type: followConstants.UNFOLLOW_USER,
                payload: post
            }));
    }
}
