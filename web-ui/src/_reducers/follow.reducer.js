import { followConstants } from '../_constants';

const initialState = {
    followResult: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case followConstants.FOLLOW_USER:
            return {
                ...state,
                followResult: action.payload
            };
        case followConstants.UNFOLLOW_USER:
            return {
                ...state,
                followResult: action.payload
            };
        default:
            return state;
    }
}
