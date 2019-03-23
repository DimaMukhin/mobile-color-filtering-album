import { combineReducers } from 'redux';
import colorFilterReducer from './colorFilterReducer';

export default combineReducers({
    colorFilter: colorFilterReducer
});
