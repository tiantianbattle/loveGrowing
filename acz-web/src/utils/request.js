import axios from 'axios'
import promise from 'es6-promise';
promise.polyfill();

axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = 'http://47.96.7.9:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json';

// const baseUrl = 'http://localhost:3000'

export const get = (params) => {
  return axios.get(params)
}

export const post = (params) => {
  return axios.post(params.url, params.data)
}

export const put = (params) => {
  return axios.put(params.url, params.data)
}
