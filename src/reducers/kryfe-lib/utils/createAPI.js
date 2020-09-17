import isArray from 'lodash/isArray';
import Consts from '../fetchHelper/consts';
import processHeaders from './processHeaders';

function request(FetchRequest, HttpMethod, url, params, options) {
  const defaultOptions = {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  // create request headers
  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: processHeaders({
      ...defaultOptions.headers,
      ...options.headers,
    }),
  };

  // translate 'x-requested-with' to 'X-Requested-With'
  if ('x-requested-with' in requestOptions.headers) {
    requestOptions.headers['X-Requested-With'] =
      requestOptions.headers['x-requested-with'];
    delete requestOptions.headers['x-requested-with'];
  }

  // create request body
  if (params) {
    // do not set headers.contentType when submit FormData
    if (typeof FormData !== 'undefined' && params instanceof FormData) {
      requestOptions.body = params;
      delete requestOptions.headers['Content-Type'];
    } else if (isArray(params)) {
      // post request payload can be a array
      requestOptions.body = [...params];
    } else {
      requestOptions.body = { ...params };
    }
  }

  return FetchRequest[HttpMethod](url, requestOptions);
}

const headers = {
  'Content-Type': 'application/json',
};

export default (FetchRequest, globalOptions = {}) => ({
  get: (url, params = {}, options = {}) =>
    request(FetchRequest, Consts.HttpMethods.GET, url, params, {
      ...globalOptions,
      ...options,
    }),
  delete: (url, params = {}, options = {}) =>
    request(FetchRequest, Consts.HttpMethods.DELETE, url, params, {
      ...globalOptions,
      ...options,
    }),
  post: (url, params = {}, options = {}) =>
    request(FetchRequest, Consts.HttpMethods.POST, url, params, {
      headers,
      ...globalOptions,
      ...options,
    }),
  put: (url, params = {}, options = {}) =>
    request(FetchRequest, Consts.HttpMethods.PUT, url, params, {
      headers,
      ...globalOptions,
      ...options,
    }),
  patch: (url, params = {}, options = {}) =>
    request(FetchRequest, Consts.HttpMethods.PATCH, url, params, {
      headers,
      ...globalOptions,
      ...options,
    }),
  head: (url, params = {}, options = {}) =>
    request(FetchRequest, Consts.HttpMethods.HEAD, url, params, {
      headers,
      ...globalOptions,
      ...options,
    }),
});
