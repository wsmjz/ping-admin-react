// 导出 get post put等方法
// 参数：(url, params, options, baseUrl)
// 返回：etchRequest(HttpMethod, url, params, options, baseUrl)

import { merge } from 'lodash';
import { Utils } from '../reducers/kryfe-lib/index';
import { Consts, FetchRequest } from './fetchRequest';
const createAPI = Utils.createAPI(FetchRequest); // 1
// {
//     post: (url, params = {}, options = {}) =>
//     request(FetchRequest, Consts.HttpMethods.POST, url, params, {
//       headers,
//       ...globalOptions,
//       ...options,
//     }),
// }
// 会返回对象   createAPI[HttpMethod] == post
let kryApiBrandId = null;

function getCookies(name) {
  const cookies = document.cookie.split(';');
  let result = null;
  cookies.every(value => {
    const intertor = value.split('=');
    if (intertor[0].trim() === name) {
      [, result] = intertor;
      return false;
    }
    return true;
  });
  return result;
}

function getKryApiBrandId() {
  // LocalDevBrandId
  if ('__DEV__') return 101237;
  if (kryApiBrandId) {
    return kryApiBrandId;
  }
  kryApiBrandId = getCookies('kry-api-brand-id');
  return kryApiBrandId || '';
}

export function createUrl(url, baseUrl, HttpMethod) {
  if (url) {
    if (HttpMethod !== Consts.HttpMethods.GET) {
      return `${baseUrl}/${url}?kry-api-brand-id=${getKryApiBrandId()}`;
    }
    return `${baseUrl}/${url}`;
  }

  return baseUrl;
}

function fetchRequest(HttpMethod, url, params, options, baseUrl) {
    // HttpMethod = 'post'
  const defaultOptions = {
    mode: 'cors',
    credentials: 'include',
    headers: {
      newBUI: 'Y',
      'x-requested-with': 'XMLHttpRequest',
      pageUrl: window.location.href,
      'kry-api-brand-id': getKryApiBrandId(),
    },
  };

  // 防止传递过来的是immutable对象
  const newParams = params.toJS ? params.toJS() : params;
  const requestOptions = merge(defaultOptions, options);
  return createAPI[HttpMethod](
    createUrl(url, baseUrl, HttpMethod),
    newParams,
    requestOptions,
  );
}

export default {
  get(url, params = {}, options = {}, baseUrl = '__HOST_API__') {
    if ('__DEV__') {
      if (url == 'loyt/sso/get') {
        baseUrl = 'http://citestloyalty.shishike.com';
      }
    }

    return fetchRequest(
      Consts.HttpMethods.GET,
      url,
      { ...params, 'kry-api-brand-id': getKryApiBrandId() },
      options,
      baseUrl,
    );
  },
  post(url, params = {}, options = {}, baseUrl = '__HOST_API__') {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    return fetchRequest(
    //   Consts.HttpMethods.POST,
      'post',
      url,
      params,
      Object.assign({}, options, { headers }),
      baseUrl,
    );
  },
  put(url, params = {}, options = {}, baseUrl = '__HOST_API__') {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    return fetchRequest(
    //   Consts.HttpMethods.PUT,
    'put',
      url,
      params,
      Object.assign({}, options, { headers }),
      baseUrl,
    );
  },
  delete(url, params = {}, options = {}, baseUrl = '__HOST_API__') {
    return fetchRequest(
      Consts.HttpMethods.DELETE,
      url,
      params,
      options,
      baseUrl,
    );
  },
};
