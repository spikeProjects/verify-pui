import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// import accountReducer from '../reducers/accountReducer';
import globalReducer from '../reducers/globalReducer';
import thunk from 'redux-thunk';
import apiMiddleware from '../middleware/apiErrorMiddleware';

const isDevMode = process.env.NODE_ENV === 'development';
const composeWithDevToolsInDevMode = (args: any) => isDevMode ? composeWithDevTools(args) : args;

const middlewares = [
  thunk,
  apiMiddleware,
];

export default createStore(globalReducer, composeWithDevToolsInDevMode(applyMiddleware(thunk, ...middlewares)));
