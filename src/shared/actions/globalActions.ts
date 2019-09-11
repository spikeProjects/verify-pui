import {API_ERROR, API_ERROR_RESET} from '../constants/globalConstants';
import {hashHistory} from '../helper';

export const setError = (statusCode: string, errorMessage = '') => ({
  type: API_ERROR,
  code: statusCode,
  message: errorMessage,
  prePath: hashHistory.location.pathname
});

export const resetError = () => ({
  type: API_ERROR_RESET
});
