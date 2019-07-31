import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { method = 'get', url, data = null, headers, responseType, timeout } = config;
    const request = new XMLHttpRequest();
    if (responseType) {
      request.responseType = responseType;
    }
    if (timeout) {
      request.timeout = timeout;
    }
    request.open(method.toUpperCase(), url, true);
    request.onreadystatechange = function handleLoaded() {
      if (request.readyState !== 4) {
        return;
      }
      const responseHeaders = request.getAllResponseHeaders();
      const responseData = responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      handleResponse(response);
    }
    request.onerror = function handleError() {
      reject(new Error('network error'))
    }
    request.ontimeout = function () {
      reject(new Error('timeout of ' + timeout))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    })
    request.send(data);
    function handleResponse(response: AxiosResponse) {
      if(response.status >= 200 && response.status < 300) {
        resolve(response);
      }else {
        reject(new Error('response error'));
      }
    }
  })
}