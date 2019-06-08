import {
  API_ERROR,
  API_ERROR_RESET
} from '../constants';

const defaultError = {
  isError: false,
  code: null,
  message: null,
  prePath: '/'
};

export default (state: any = defaultError, action: any) => {
  switch (action.type) {
  case API_ERROR:
    return {
      ...state,
      isError: true,
      code: action.code,
      message: action.message,
      prePath: action.prePath
    };

  case API_ERROR_RESET:
    return {
      ...state,
      isError: false,
      code: null,
      message: null
    };

  default:
    return state;
  }
};
