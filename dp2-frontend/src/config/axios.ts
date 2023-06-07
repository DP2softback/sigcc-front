/** ================ DO NOT MODIFY THIS FILE ================ */
/** THIS IS DEFULT CONFIGURATION FOR AN AXIOS INSTANCE */

import axios from 'axios';

//const baseUrl = import.meta.env.VITE_BASE_URL;
 const baseUrl = 'http://localhost:8000/api/';
// const baseUrl = 'https://9dsao8d5fc.execute-api.us-east-1.amazonaws.com/dev-modulo-capacitaciones/api/';

const axiosInt = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token b7f640fc5d833b0329e6b1045f088c0fcf5f191e',
  }
});

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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