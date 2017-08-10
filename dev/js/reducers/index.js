import {combineReducers} from 'redux';
import UserReducer from './user-reducer';

const allReducers = combineReducers({
    activeUser: UserReducer
});

export default allReducers
