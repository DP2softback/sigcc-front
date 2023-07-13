

import axios from "axios";
import { TOKEN } from '@features/Modulo3/utils/constants';
const TOKEN_G3 = 'Token '+ TOKEN;
import {TOKEN_SERVICE, URL_SERVICE2} from '@features/Modulo2/services/ServicesApis'
const baseUrl = URL_SERVICE2;

const axiosEmployeeStats = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': TOKEN_G3,
  }
});

axiosEmployeeStats.interceptors.response.use(
  (response) => response,
  (error) =>
    { 
      return Promise.reject(
        (error.response && error.response.data) || 'There is an error!'
      )
    }
);

export default axiosEmployeeStats;
