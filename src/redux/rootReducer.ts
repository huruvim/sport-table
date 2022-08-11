import { combineReducers } from 'redux';
import {teamReducer} from './teamReducer';

const rootReducer = combineReducers({
    team: teamReducer,
});

export default rootReducer;