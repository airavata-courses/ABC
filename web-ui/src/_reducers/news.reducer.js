import { newsConstants } from '../_constants'

const initialState = {
    news: {} 
}

export default function (state = initialState, action) {
    switch (action.type) {
        case newsConstants.GET_NEWS:
            return {
                ...state,
                news: action.payload
            };
        default:
            return state;
    }
}
