import { searchConstants } from '../_constants'

const initialState = {
    followers: [],
    following: [],
    searchusers: []

}

export default function (state = initialState, action) {
    switch (action.type) {
        case searchConstants.SEARCH_USER:
            return {
                ...state,
                searchusers: action.payload
            };
        case searchConstants.SEARCH_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            };
        case searchConstants.SEARCH_FOLLOWING:
            return {
                ...state,
                following: action.payload
            };
        default:
            return state;
    }
} 
