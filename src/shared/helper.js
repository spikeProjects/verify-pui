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

export const PPN_LOGIN = 'https://ppnlite.porsche.com/';  //TODO
export const USER_TOKEN = 'POS-user-token';

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

const urlShim = (url) => {
  return url;
}

export const titleCase=(str)=>{
  if(!str)return '';
  let arr = str.toLowerCase().split(" ");
  for (let i=0;i<arr.length;i++){
    let char = arr[i].charAt(0);
    arr[i] = arr[i].replace(char, function replace(char){
      return char.toUpperCase();
    });
  }
  return arr.join(' ');
};

axiosInstance.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem(USER_TOKEN);
  let headers=Object.assign({},config.headers, {
    Authorization: token
  });
  return Object.assign({},config,{headers});
}, function (error) {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  // TODO: 
  let refreshToken=response.headers["X-ACCESS-TOKEN"];
  let tokenType=response.headers["X-TOKEN-TYPE"];
  if(refreshToken){
    window.localStorage.setItem(USER_TOKEN ,`${titleCase(tokenType)} ${refreshToken}`);
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export const api = {
  /**
   * @param: url
   * @param: method: get | post | put | delete | head | options | patch
   * @param: headers
   * @param: queryParams
   * ...: responseType/
   */
  request: (argu) => {
    let config = {};
    const {url, method, queryParams, data, ...rest}=argu;
    if (!argu.url) {
      throw new Error('No request url');
    } else {
      config.url = url
    }
    if (argu.method) {
      config.method = method;
    }
    if (queryParams) {
      config.params = toQueryParam(queryParams);
    }
    if (data) {
      config.data = data;
    }
    config = Object.assign({},config,{...rest});

    return axiosInstance.request(config)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        if (err.response) {
          const data=err.response.data;
          if (data && data.code === 401 ) {
            // window.localStorage.removeItem(USER_TOKEN);
            // TODO: redirect to login, to get the url of PPN login
            message.error("token失效，请重新登录");//先暂时做个提示，方便清楚token已失效
            // window.location.href = PPN_LOGIN;
          }else {
            message.error(data && data.message);  // TBD
          }
        } else {
          message.error("请求超时，请稍后再试");
        }
        return Promise.reject(err);
      });
  },

  get: (url, queryParams = {}) => {
    return api.request({
      url: urlShim(url),
      queryParams: queryParams
    });
  },

  post: (url, data, config, queryParams = {}) => {
    return api.request({
      url: urlShim(url),
      methd: 'post',
      queryParams: queryParams,
      data: data,
      ...config
    });
  },

  put: (url, data, config) => {
    return api.request({
      url: urlShim(url),
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
