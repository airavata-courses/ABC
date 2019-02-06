import { searchConstants } from '../_constants'

const initialState = {
    users: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case searchConstants.SEARCH_USER:
            return {
                ...state,
                users: action.payload
            };
        case searchConstants.SEARCH_FOLLOWERS:
            return {
                ...state,
                users: action.payload
            };
        case searchConstants.SEARCH_FOLLOWING:
            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
} 
