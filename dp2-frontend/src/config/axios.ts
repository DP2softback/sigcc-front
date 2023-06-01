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
    'Authorization': 'Token 76722f7bbe0cf200d19620bb90dddc2671535ea5',
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