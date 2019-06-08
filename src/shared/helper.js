import {includes} from 'lodash';
import {createBrowserHistory, createHashHistory} from 'history';
import axios from 'axios';
// import cookie from 'react-cookie';
import {message} from 'antd';

export const history = createBrowserHistory();

export const hashHistory = createHashHistory();

export const scrollToTop = () => window.scrollTo(0, 0);

// the authorize algorithm goes here
export const authorized = (allowed, currentRole) => includes(allowed, currentRole);

const axiosInstance = axios.create({
  baseURL: window.location.origin,
  timeout: 5000,
  headers: {'X-CSRF-TOKEN': ''}, // (cookie).load('X-CSRF-TOKEN')},
  withCredentials: true,
  responseType: 'json',
  // proxy: {
  //   host: '',
  //   port: 8888
  // }
});

const toQueryParam = (queryParams) => {
  const params = new URLSearchParams();
  Object.keys(queryParams).forEach(key => {
    if (queryParams[key]) {
      params.append(key, queryParams[key]);
    }
  });
  return params;
};

export const queryObject = () => {
  let q = {};
  window.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v);
  return q;
};


export const api = {
  /**
   * @param: url
   * @param: method: get | post | put | delete | head | options | patch
   * @param: headers
   * @param: queryParams
   * ...: responseType/
   */
  request: (argu) => {
    if (!argu.url) {
      throw new Error('No request url');
    }
    const config = {};
    if (argu.queryParams) {
      config.params = toQueryParam(argu.queryParams);
    }
    if (argu.data) {
      config.data = argu.data;
    }
    return axiosInstance.request(config)
      .then((res) => {
        message.success(res.message);
        return Promise.resolve(res.data);
      })
      .catch(err => {
        if (err.response) {
          message.error(err.response);  // TBD
        } else {
          message.error(err.request);
        }
        return Promise.error(err);
      });
  },

  get: (url, queryParams = {}) => {
    return api.request({
      url: url,
      queryParams: queryParams
    });
  },

  post: (url, data, config, queryParams = {}) => {
    return api.request({
      url: url,
      methd: 'post',
      queryParams: queryParams,
      data: data,
      ...config
    });
  },

  put: (url, data, config) => {
    return api.request({
      url: url,
      method: 'put',
      data: data,
      ...config
    });
  },

  // Be careful to use this function
  changeGlobalAxiosInstance: (params) => {
    Object.keys(params).forEach(element => {
      axiosInstance.defaults[element] = params[element];
    });
  }
};
