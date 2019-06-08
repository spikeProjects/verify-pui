import React, {Component} from 'react';
import {Provider} from 'react-redux';
import InnerComponent from './containers/InnerComponent';
import store from './store';
import './style.scss';

export default class ExampleModule extends Component {

  render() {
    return (
      <Provider store={store}>
        <InnerComponent></InnerComponent>
      </Provider>
    );
  }
}
