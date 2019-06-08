import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/es/map';
import 'core-js/es/set';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import accountStore from './shared/store/accountStore';
import App from './app';
import './index.sass';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={accountStore}>
    <App />
  </Provider>
, document.getElementById('root')! as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
