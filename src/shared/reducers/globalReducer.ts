import {combineReducers} from 'redux';
import account from './accountReducer';
import error from './errorReducer'

export default combineReducers({
  error,
  account,
});
