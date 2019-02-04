import { postConstants } from '../_constants';

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case postConstants.FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            };
        case postConstants.NEW_POST:
            return {
                ...state,
                item: action.payload
            };

        default:
            return state;
    }
}
