/** ================ DO NOT MODIFY THIS FILE ================ */
/** THIS IS DEFULT CONFIGURATION FOR AN AXIOS INSTANCE */

import axios from 'axios';

// export const baseUrl = import.meta.env.VITE_BASE_URL;
export const baseUrl = 'http://localhost:8000/api/';
// export const baseUrl = 'https://9dsao8d5fc.execute-api.us-east-1.amazonaws.com/dev-modulo-capacitaciones/api/';
// export const baseUrl = 'http://ec2-44-195-104-181.compute-1.amazonaws.com/api/';
// export const baseUrl = 'http://44.195.104.181/api/';

// const baseUrl = 'http://127.0.0.1:8000/api/';
// const axiosInt = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': localStorage.getItem('accessToken')
//     ? 'Token ' + localStorage.getItem('accessToken')
//     : null,
// }
// });

const axiosInt = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token b7f640fc5d833b0329e6b1045f088c0fcf5f191e',
  }
  //     'Authorization': localStorage.getItem('dp2-access-token')
  //     ? 'Token ' + localStorage.getItem('dp2-access-token')
  //     : null,
  // }
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