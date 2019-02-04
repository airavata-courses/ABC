import { combineReducers } from 'redux';
import alertReducer from './alert.reducer'
import postReducer from './post.reducer'
import authentication from './authentication.reducer'
import registration from './registration.reducer'
import users from './user.reducer'

const rootReducer = combineReducers({
    posts: postReducer,
    alert: alertReducer,
    authentication: authentication,
    registration: registration,
    users: users
});

export default rootReducer;
