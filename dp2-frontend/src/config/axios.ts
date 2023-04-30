/** ================ DO NOT MODIFY THIS FILE ================ */
/** THIS IS DEFULT CONFIGURATION FOR AN AXIOS INSTANCE */

import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const axiosInt = axios.create({
  baseURL: baseUrl
});

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axiosInt.interceptors.response.use(
  (response) => response,
  (error) =>
    { 
      return Promise.reject(
        (error.response && error.response.data) || 'There is an error!'
      )
    }
);

export default axiosInt;