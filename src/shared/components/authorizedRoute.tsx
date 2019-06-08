import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {isEmpty, includes} from 'lodash';

import {authorized} from '../helper';
import Login from '../../modules/login/login';
import {setError} from '../actions/globalActions';
import globalToggles from '../../globalToggles';
import {UNAUTHORIZED, UNAUTHORIZED_ERROR_MESSAGE} from '../constants/globalConstants';

interface Props {
  setError: Function
}

const AuthorizeRoute = (allowed: any[], currentRole: string) => {

  return (WrappedComponent: any) => {

    class WithAuthorization extends React.Component<any> {
      static propTypes: any;
      renderUnauthorizedPage = () => {
        if (globalToggles.loggedIn) {
          this.props.setError(UNAUTHORIZED, UNAUTHORIZED_ERROR_MESSAGE);  // TODO:
          return null;
        } else {
          return <Login />;
        }
      };

      render() {
        if (authorized(allowed, currentRole)) {
          return <WrappedComponent {...this.props} />;
        } else {
          return this.renderUnauthorizedPage();
        }
      }
    }

    WithAuthorization.propTypes = {
      setError: PropTypes.func,
    };

    const mapDispatchToProps = {
      setError
    };

    return connect(() => ({}), mapDispatchToProps)(WithAuthorization);
  };
};


export default AuthorizeRoute;
