import React, {Component} from 'react';
import {Provider} from 'react-redux';
import InnerComponent from './containers/innerComponent';
import store from './store';
import './style.scss';

export default class LazyModule extends Component {

  render() {
    console.log('lazy loaded this one');
    return (
      <Provider store={store}>
        <InnerComponent />
      </Provider>
    );
  }
}
