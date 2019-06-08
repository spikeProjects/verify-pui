// import {get, find, includes} from 'lodash';

// import {saveError} from '../actions/errorPopupActions';
// import ErrorConfigs from '../../constants/errorConfigs';

const apiMiddleware = ({dispatch}) => {
  return next => {
    return action => {
      next(action);
    };
  };
};

export default apiMiddleware;