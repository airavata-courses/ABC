import { combineReducers } from 'redux';
import alertReducer from './alert.reducer'
import postReducer from './post.reducer'
import authentication from './authentication.reducer'
import registration from './registration.reducer'
import users from './user.reducer'
import searchReducer from './search.reducer'
import newsReducer from './news.reducer'
const rootReducer = combineReducers({
    posts: postReducer,
    alert: alertReducer,
    authentication: authentication,
    registration: registration,
    users: users,
    search_result: searchReducer,
    news: newsReducer
});

export default rootReducer;
