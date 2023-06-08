

import axios from "axios";

const baseUrl = "https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1";

const axiosEmployeeGaps = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token 5ad77c64f19039ef87cca20c2308ddbbaf3014bf',
  }
});

axiosEmployeeGaps.interceptors.response.use(
  (response) => response,
  (error) =>
    { 
      return Promise.reject(
        (error.response && error.response.data) || 'There is an error!'
      )
    }
);

export default axiosEmployeeGaps;

export async function getEmployeeCompetences(obj) {
  try {
    const { data, status } = await axios.post(
      baseUrl + 'gaps/competenceSearch',
      {idCompetencia: obj.idCompetencia, palabraClave: obj.palabraClave, idTipoCompetencia: obj.idTipoCompetencia, activo: 2, idEmpleado: obj.idEmpleado},
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}