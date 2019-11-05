/// <reference path="types.d.ts" />
// @flow
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Link, NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {get, isEmpty} from 'lodash';

// import {getToken, PorMenu, api} from '@rockwang/pui';
import PUI from 'pui';
import {getToken} from 'pui';

import './app.sass';
import routesFactory from './routesFactory';
import {fetchAccount} from './shared/actions';
import {hashHistory, history} from './shared/helper';

export interface AppProps {
  fetchAccount: any,
  currentAccount: any,
  prePath?: any
}

class App extends React.Component<AppProps, object> {
  static propTypes: AppProps;

  componentDidMount() {
    this.props.fetchAccount();
    console.log(PUI, getToken, PUI.getToken);
  }

  componentDidUpdate(prevProps: any) {
    // TODO: 
    const {currentAccount: {role: prevRole}} = prevProps;
    const {currentAccount: {role}, prePath} = this.props;

    if (!isEmpty(role) && prevRole !== role && hashHistory.location.pathname !== prePath) {
      history.push(prePath);
    }
  }

  render() {
    const {currentAccount: {role}} = this.props;
    return (
      <Fragment>
        <header>header</header>
        <HashRouter>
          <ul>
            <li>
              <Link to="/example">example</Link>
              <NavLink to="/example" activeClassName="at">example</NavLink>
              <NavLink to="/typescriptStarter" activeClassName="at">typescriptStarter</NavLink>
              <NavLink to="/lazy" activeClassName="at">lazy</NavLink>
            </li>
          </ul>
          {routesFactory(role)}
        </HashRouter>
        <footer>footer</footer>
      </Fragment>
    );
  }
}

App.propTypes = {
  fetchAccount: PropTypes.func.isRequired,
  currentAccount: PropTypes.object.isRequired,
  prePath: PropTypes.string
};

const mapStateToProps = (state: any) => {
  return {
    currentAccount: get(state, 'account'),
    prePath: get(state, 'error.prePath')
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchAccount: () => dispatch(fetchAccount())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
